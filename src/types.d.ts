import {
  Contact,
  Property,
  PropertyFeature,
  PropertyImage,
  PropertyLocation,
  PropertyStatus,
  PropertyType,
} from "@prisma/client";

type PropertyFormData = Omit<Property, "userId", "typeId", "statusId">;

type PropertyTableData = {
  name: string;
  price: string;
  type: string;
  status: string;
  userId: string;
  propertyId: string;
};

type PropertyExt = Property & {
  propertyType: PropertyType;
  propertyFeature: PropertyFeature;
  propertyLocation: PropertyLocation;
  propertyStatus: PropertyStatus;
  images: PropertyImage[];
  contact: Contact;
};
