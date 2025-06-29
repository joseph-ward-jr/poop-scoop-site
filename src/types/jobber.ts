// Jobber API Types - Based on official Jobber API schema
export interface JobberClientInput {
  firstName: string
  lastName?: string
  companyName?: string
  emails: JobberEmailInput[]
  phones?: JobberPhoneInput[]
  billingAddress?: JobberAddressInput
  // Note: 'notes' field doesn't exist on ClientCreateInput according to official Jobber API
}

export interface JobberEmailInput {
  description: 'MAIN' | 'WORK' | 'OTHER'
  primary: boolean
  address: string
}

export interface JobberPhoneInput {
  description: 'MAIN' | 'WORK' | 'MOBILE' | 'FAX' | 'OTHER'
  primary: boolean
  number: string
}

export interface JobberAddressInput {
  street1?: string
  street2?: string
  city?: string
  province?: string
  postalCode?: string
  country?: string
}

export interface JobberClient {
  id: string
  firstName: string
  lastName?: string
  companyName?: string
  emails: JobberEmail[]
  phones: JobberPhone[]
  billingAddress?: JobberAddress
}

export interface JobberEmail {
  id: string
  description: string
  primary: boolean
  address: string
}

export interface JobberPhone {
  id: string
  description: string
  primary: boolean
  number: string
}

export interface JobberAddress {
  id: string
  street1?: string
  street2?: string
  city?: string
  province?: string
  postalCode?: string
  country?: string
}

export interface JobberUserError {
  message: string
  path: string[]
}

export interface JobberClientCreateResponse {
  clientCreate: {
    client?: JobberClient
    userErrors: JobberUserError[]
  }
}

export interface JobberApiError {
  message: string
  locations?: Array<{
    line: number
    column: number
  }>
  path?: string[]
  extensions?: {
    code: string
    [key: string]: any
  }
}

export interface JobberApiResponse<T = any> {
  data?: T
  errors?: JobberApiError[]
}

// Form data mapping types
export interface ContactFormData {
  name: string
  email: string
  phone: string
  address: string
  contactPreference: string
  additionalInfo: string
}

export interface JobberSubmissionResult {
  success: boolean
  client?: JobberClient
  errors?: string[]
}


