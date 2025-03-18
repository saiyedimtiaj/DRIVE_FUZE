export type TUser = {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  gender?: string;
  phone?: string;
  dateOfBirth?: string;
  jobTitle?: string;
  salary?: string;
  address?: string;
  address2?: string;
  postcode?: string;
  city?: string;
  country?: string;
  employmentStatus?: string;
  licenseNumber?: string;
  marketingPreferences?: string;
  frontOfDrivingLicense?: string;
  backOfDrivingLicense?: string;
  proofOfAddress?: string;

  companyRegNumber?: string;
  fcaRegNumber?: string;
  vatNumber?: string;
  businessType?: string;
  primaryRole?: string;
  primaryPhone?: string;
  secondaryRole?: string;
  secondaryEmail?: string;
  secondaryPhone?: string;
  street?: string;
  operatingHours?: string;
  _id: string;

  activeCarCount?: number;
  activeSubscriptionCount?: number;
  createdAt?: string;
};

export type TCar = {
  _id?: string;
  registrationNumber: string;
  brand?: string;
  model?: string;
  variant?: string;
  yearOfManufacture?: string;
  fuelType?: string;
  price: number;
  mileage?: number;
  location: string;

  colour?: string;
  co2Emissions?: number;
  carType?: string;
  driveTrain?: string;
  gearbox?: string;
  electricRange?: number;
  engineCapacity?: string;
  euroStatus?: string;

  details?: string;
  images: string[];
  status: string;
  createdAt: string;

  dealerId: TUser;
};

export interface TRequest {
  _id: string;
  carId: TCar;
  userId: TUser;
  customerInfo: {
    gender: string;
    firstName: string;
    lastName: string;
    preferredName: string;
    phoneNumber: string;
    email: string;
    employmentStatus: string;
    jobTitle: string;
    salary: number;
    licenseNumber: string;
  };
  address: {
    addressLine1: string;
    addressLine2: string;
    townCity: string;
    country: string;
    postcode: string;
  };
  aditionalDriverInfo?: {
    gender?: string;
    firstName?: string;
    lastName?: string;
    preferredName?: string;
    phone?: string;
    email?: string;
    employmentStatus?: string;
    jobTitle?: string;
    salary?: number;
    licenseNumber?: string;
  };
  aditionalDriver: string;
  aditionalMiles: string;
  stock?: string;
  leaseStartDate: Date;
  leaseEndDate?: Date;
  registrationNumber?: string;
  leasePrice: number;
  for1stMonthSubscription: number;
  customerCheck: string;
  aditionalDriverCheck?: string;
  dealerId: TUser;
  paymentId?: string;
  status?: string;
  createdAt: string;
  score?: number;
}

export type TCustomerCheck = {
  requestId: TRequest;
  userId: TUser;
  primaryDriverFrontOfDrivingLicense: string;
  primaryDriverBackOfDrivingLicense: string;
  primaryDriverProofOfAddress: string;
  additionalDriverFrontOfDrivingLicense?: string;
  additionalDriverBackOfDrivingLicense?: string;
  additionalDriverProofOfAddress?: string;
  identityCheck: string;
  DVLACheck: string;
  creditCheck: string;
  requestDate: string;
  expiredDate?: string;
  aditionAlNotes?: string;
  status: string;
  updatedAt: string;
  createdAt: string;
  score: number;
  _id: string;
};

export interface TDelivery {
  userId: string;
  carId: string;
  preparationId: string;
  requestId: string;

  confirmDeliveryDate: Date;
  pdiDocument: { url: string; id: string };
  subscriptionAggrement?: { url: string; id: string };
  carImages: { url: string; id: string }[];
  dealerComment: string;
  startingMiles: number;
  fuelLabel?: string;

  status: string;
}

export interface ISubscription {
  requestId: TRequest;
  dealerId: TUser;
  carId: TCar;
  userId: TUser;

  leaseStartDate: string;
  leaseEndDate: string;
  leasePrice: number;

  dealerComment?: string;
  fuelLabel?: string;
  status: string;
  _id: string;
  deliveryId: TDelivery;
  preparetionId: {
    customerComment: string;
  };
  comment: string;
}

export type TBlog = {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  readTime: string;
  image: string;
  status: string;
  _id: string;
  createdAt: string;
};

export type TNews = {
  title: string;
  category: string;
  status: string;
  excerpt: string;
  content: string;
  image: string;
  _id: string;
  createdAt: string;
};

export type TTestimonial = {
  customerName: string;
  role: string;
  delearship: string;
  rating: string;
  testimonial: string;
  status: string;
  _id: string;
  createdAt: string;
};

export type TMessages = {
  name: string;
  role: string;
  message: string;
  time: string;
};

export type TCareCare = {
  userId: TUser;
  issue: string;
  location: string;
  note: string;
  damageDescription?: string;
  issueDate: Date;
  status: string;
  priority: string;
  images: { url: string; id: string }[];
  createdAt: string;
  updatedAt: string;
  _id: string;
  messages?: TMessages[];
};

export type TDealerSupport = {
  dealerId: TUser;
  issue: string;
  issueType: string;
  status: string;
  priority: string;
  createdAt: string;
  updatedAt: string;
  note: string;
  _id: string;
  messages?: TMessages[];
};

export interface TReturnDetails {
  date: string;
  dealerComments: string;
  customerComments: string;
  currentMileage: number | null;
  fuelLevel: string;
  charges: {
    category: string;
    description: string;
    amount: number;
    evidence: File[];
    startingLength: number;
    endingLength: number;
  }[];
}

export interface ICharge {
  category: string;
  description: string;
  amount: number;
  evidence?: string[];
}

export interface IReturnDetails {
  subscriptionId: string;
  _id: string;
  date: string;
  pdiDocument: string | null;
  photos: string[];
  dealerComments: string;
  customerComments: string;
  currentMileage: number | null;
  fuelLevel: string;
  charges?: ICharge[];
}
