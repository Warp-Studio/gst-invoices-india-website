export const round2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;

export type GstBreakdown = {
  taxable: number;
  cgst: number;
  sgst: number;
  igst: number;
  gst: number;
  total: number;
};

/**
 * `inclusive` means `amount` already contains GST (we back it out); otherwise GST is added on top.
 * Intra-state supplies split GST equally into CGST + SGST; inter-state supplies charge IGST.
 */
export function calculateGst(amount: number, rate: number, inclusive: boolean, interState: boolean): GstBreakdown {
  if (inclusive) {
    const taxable = round2((amount * 100) / (100 + rate));
    const gst = round2(amount - taxable);
    const cgst = interState ? 0 : round2(gst / 2);
    const sgst = interState ? 0 : round2(gst - cgst);
    return { taxable, cgst, sgst, igst: interState ? gst : 0, gst, total: round2(amount) };
  }

  const taxable = round2(amount);
  if (interState) {
    const igst = round2((taxable * rate) / 100);
    return { taxable, cgst: 0, sgst: 0, igst, gst: igst, total: round2(taxable + igst) };
  }
  const half = round2((taxable * rate) / 200);
  return { taxable, cgst: half, sgst: half, igst: 0, gst: round2(half * 2), total: round2(taxable + half * 2) };
}

export const stateCodes: Record<string, string> = {
  '01': 'Jammu and Kashmir',
  '02': 'Himachal Pradesh',
  '03': 'Punjab',
  '04': 'Chandigarh',
  '05': 'Uttarakhand',
  '06': 'Haryana',
  '07': 'Delhi',
  '08': 'Rajasthan',
  '09': 'Uttar Pradesh',
  '10': 'Bihar',
  '11': 'Sikkim',
  '12': 'Arunachal Pradesh',
  '13': 'Nagaland',
  '14': 'Manipur',
  '15': 'Mizoram',
  '16': 'Tripura',
  '17': 'Meghalaya',
  '18': 'Assam',
  '19': 'West Bengal',
  '20': 'Jharkhand',
  '21': 'Odisha',
  '22': 'Chhattisgarh',
  '23': 'Madhya Pradesh',
  '24': 'Gujarat',
  '25': 'Daman and Diu (old code)',
  '26': 'Dadra and Nagar Haveli and Daman and Diu',
  '27': 'Maharashtra',
  '28': 'Andhra Pradesh (old code)',
  '29': 'Karnataka',
  '30': 'Goa',
  '31': 'Lakshadweep',
  '32': 'Kerala',
  '33': 'Tamil Nadu',
  '34': 'Puducherry',
  '35': 'Andaman and Nicobar Islands',
  '36': 'Telangana',
  '37': 'Andhra Pradesh',
  '38': 'Ladakh',
  '97': 'Other Territory',
  '99': 'Centre Jurisdiction',
};

// The 4th character of a PAN identifies the type of holder.
export const panHolderTypes: Record<string, string> = {
  A: 'Association of Persons (AOP)',
  B: 'Body of Individuals (BOI)',
  C: 'Company',
  F: 'Firm / LLP',
  G: 'Government agency',
  H: 'Hindu Undivided Family (HUF)',
  J: 'Artificial juridical person',
  L: 'Local authority',
  P: 'Individual / proprietor',
  T: 'Trust',
};

const CHARSET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function gstinCheckDigit(first14: string): string {
  let sum = 0;
  for (let i = 0; i < 14; i++) {
    const product = CHARSET.indexOf(first14[i]) * (i % 2 === 0 ? 1 : 2);
    sum += Math.floor(product / 36) + (product % 36);
  }
  return CHARSET[(36 - (sum % 36)) % 36];
}

export type GstinCheck = {
  gstin: string;
  valid: boolean;
  errors: string[];
  warnings: string[];
  state?: string;
  pan?: string;
  holderType?: string;
  entityNumber?: string;
  expectedCheckDigit?: string;
};

export function normalizeGstin(input: string) {
  return input.toUpperCase().replace(/[\s-]/g, '');
}

export function checkGstin(input: string): GstinCheck {
  const gstin = normalizeGstin(input);
  const errors: string[] = [];
  const warnings: string[] = [];

  if (gstin.length !== 15) {
    errors.push(`A GSTIN has exactly 15 characters. This one has ${gstin.length}.`);
    return { gstin, valid: false, errors, warnings };
  }
  if (!/^[0-9A-Z]{15}$/.test(gstin)) {
    errors.push('A GSTIN can only contain the letters A–Z and the digits 0–9.');
    return { gstin, valid: false, errors, warnings };
  }

  const code = gstin.slice(0, 2);
  const pan = gstin.slice(2, 12);
  const entityNumber = gstin[12];
  const fourteenth = gstin[13];
  const state = stateCodes[code];

  if (!state) errors.push(`“${code}” is not a valid state code. The first two digits must be a GST state code.`);

  let holderType: string | undefined;
  const panValid = /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan);
  if (panValid) {
    holderType = panHolderTypes[pan[3]];
  } else {
    errors.push(`Characters 3–12 (“${pan}”) should be a PAN: 5 letters, 4 digits, then 1 letter.`);
  }

  if (entityNumber === '0') {
    errors.push('The 13th character (the registration number under this PAN) cannot be 0.');
  }

  if (fourteenth !== 'Z') {
    warnings.push(
      `The 14th character is usually “Z”. “${fourteenth}” can appear on special registrations such as TDS or TCS, so double-check this one.`,
    );
  }

  const expectedCheckDigit = gstinCheckDigit(gstin.slice(0, 14));
  if (expectedCheckDigit !== gstin[14]) {
    errors.push(
      `The last character is a check digit. For this GSTIN it should be “${expectedCheckDigit}”, not “${gstin[14]}”, which usually means a typo somewhere.`,
    );
  }

  return {
    gstin,
    valid: errors.length === 0,
    errors,
    warnings,
    state,
    pan: panValid ? pan : undefined,
    holderType,
    entityNumber,
    expectedCheckDigit,
  };
}
