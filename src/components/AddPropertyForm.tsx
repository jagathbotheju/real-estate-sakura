"use client";

import { useState, useTransition, useEffect } from "react";
import Stepper from "./Stepper";
import { Button } from "./ui/button";
import { Property, PropertyStatus, PropertyType, User } from "@prisma/client";
import BasicStep from "./BasicStep";
import { cn } from "@/lib/utils";
import LocationStep from "./LocationStep";
import FeatureStep from "./FeatureStep";
import ImageStep from "./ImageStep";
import ContactStep from "./ContactStep";
import { z } from "zod";
import {
  BasicStepSchema,
  ContactStepSchema,
  FeatureStepSchema,
  LocationStepSchema,
} from "@/lib/schema";
import { PropertyExt, PropertyFormData } from "@/types";
import { createProperty, updateProperty } from "@/actions/propertyActions";
import { toast } from "sonner";
import _ from "lodash";
import { useRouter } from "next/navigation";

const steps = [
  { label: "Basic" },
  { label: "Location" },
  { label: "Features" },
  { label: "Images" },
  { label: "Contact" },
];

interface Props {
  types: PropertyType[];
  statuses: PropertyStatus[];
  user: User;
  property?: PropertyExt | null | undefined;
  isEdit: boolean;
}

const AddPropertyForm = ({
  types,
  statuses,
  user,
  property,
  isEdit,
}: Props) => {
  const [step, setStep] = useState(0);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [basicStepData, setBasicStepData] = useState<z.infer<
    typeof BasicStepSchema
  > | null>(null);
  const [locationStepData, setLocationStepData] = useState<z.infer<
    typeof LocationStepSchema
  > | null>();
  const [featureStepData, setFeatureStepData] = useState<z.infer<
    typeof FeatureStepSchema
  > | null>();
  const [images, setImages] = useState<string[]>([]);
  const [contactStepData, setContactStepData] = useState<z.infer<
    typeof ContactStepSchema
  > | null>();
  const [imageIds, setImageIds] = useState<string[]>([]);
  const [propertyTypeData, setPropertyTypeData] = useState<
    PropertyType | undefined
  >();
  const [propertyStatusData, setPropertyStatusData] = useState<
    PropertyStatus | undefined
  >();

  // console.log("AddPropertyForm property...", property, isEdit);
  // console.log("imageIds", imageIds);

  const formSubmit = (contactStepData: z.infer<typeof ContactStepSchema>) => {
    if (isEdit && !_.isEmpty(property)) {
      if (
        !_.isEmpty(basicStepData) &&
        !_.isEmpty(locationStepData) &&
        !_.isEmpty(featureStepData) &&
        !_.isEmpty(contactStepData)
      ) {
        const formData: PropertyFormData = {
          ...basicStepData,
          id: property.id,
          userId: user.id,
          propertyType: basicStepData.type,
          propertyStatus: basicStepData.status,
          propertyLocation: { ...locationStepData },
          propertyFeature: { ...featureStepData },
          contact: { ...contactStepData },
          images: images.map((image) => ({
            url: image,
          })),
        };

        startTransition(() => {
          updateProperty({ formData, imageIds })
            .then((res) => {
              if (res.success) {
                router.push("/user/properties");
                return toast.success(res.message);
              } else {
                return toast.error(res.error);
              }
            })
            .catch((err) => {
              console.log(err);
              return toast.error(err.message);
            });
        });
      }
    } else {
      if (
        !_.isEmpty(basicStepData) &&
        !_.isEmpty(locationStepData) &&
        !_.isEmpty(featureStepData) &&
        !_.isEmpty(images) &&
        !_.isEmpty(contactStepData)
      ) {
        const propertyData: PropertyFormData = {
          ...basicStepData,
          images: images.map((image) => ({
            url: image,
          })),
          userId: user.id,
          propertyType: basicStepData.type,
          propertyStatus: basicStepData.status,
          propertyLocation: { ...locationStepData },
          propertyFeature: { ...featureStepData },
          contact: { ...contactStepData },
        };

        console.log("Create Property", propertyTypeData);

        startTransition(() => {
          createProperty(propertyData)
            .then((res) => {
              if (res.success) {
                router.push("/user/properties");
                return toast.success(res.message);
              } else {
                return toast.error(res.error);
              }
            })
            .catch((err) => {
              console.log(err);
              return toast.error(err.message);
            });
        });
      }
    }
  };

  return (
    <div className="flex flex-col">
      <Stepper items={steps} activeItem={step} setActiveItem={setStep} />

      <BasicStep
        className={cn({
          hidden: step !== 0,
        })}
        isEdit={isEdit}
        next={() => setStep((prev) => prev + 1)}
        types={types}
        statuses={statuses}
        setBasicStepData={setBasicStepData}
        setPropertyTypeData={setPropertyTypeData}
        setPropertyStatusData={setPropertyStatusData}
        property={property}
      />
      <LocationStep
        className={cn({
          hidden: step !== 1,
        })}
        next={() => setStep((prev) => prev + 1)}
        back={() => setStep((prev) => prev - 1)}
        setLocationStepData={setLocationStepData}
        property={property}
      />
      <FeatureStep
        className={cn({
          hidden: step !== 2,
        })}
        property={property}
        next={() => setStep((prev) => prev + 1)}
        back={() => setStep((prev) => prev - 1)}
        setFeatureStepData={setFeatureStepData}
      />
      <ImageStep
        className={cn({
          hidden: step !== 3,
        })}
        next={() => setStep((prev) => prev + 1)}
        back={() => setStep((prev) => prev - 1)}
        images={images}
        setImages={setImages}
        setImageIds={setImageIds}
        property={property}
      />
      <ContactStep
        className={cn({
          hidden: step !== 4,
        })}
        isEdit={false}
        property={property}
        back={() => setStep((prev) => prev - 1)}
        setContactStepData={setContactStepData}
        formSubmit={formSubmit}
      />
    </div>
  );
};

export default AddPropertyForm;
