import {
  Contact,
  Property,
  PropertyFeature,
  PropertyImage,
  PropertyLocation,
  PropertyStatus,
  PropertyType,
} from "@prisma/client";

type PropertyTableData = {
  id: string;
  name: string;
  price: string;
  type: string;
  typeData: PropertyType?;
  status: string;
  statusData: PropertyStatus?;
  userId: string;
  propertyId: string;
  images: PropertyImage[];
  contact: Contact?;
  location: PropertyLocation?;
  feature: PropertyFeature?;
};

type PropertyExt = Property & {
  propertyType: PropertyType;
  propertyFeature: PropertyFeature;
  propertyLocation: PropertyLocation;
  propertyStatus: PropertyStatus;
  images: PropertyImage[];
  contact: Contact;
};

type PropertyFormData = Omit<PropertyExt, "userId", "typeId", "statusId">;
