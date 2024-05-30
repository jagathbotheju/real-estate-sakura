"use client";

import { useState } from "react";
import Stepper from "./Stepper";
import { Button } from "./ui/button";
import { PropertyStatus, PropertyType } from "@prisma/client";
import BasicStep from "./BasicStep";
import { cn } from "@/lib/utils";
import LocationStep from "./LocationStep";

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
}

const AddPropertyForm = ({ types, statuses }: Props) => {
  const [step, setStep] = useState(0);

  return (
    <div className="flex flex-col">
      <Stepper items={steps} activeItem={step} setActiveItem={setStep} />
      {/* <Button onClick={() => setStep((prev) => prev + 1)}>Next</Button> */}

      <BasicStep
        className={cn({
          hidden: step !== 0,
        })}
        next={() => setStep((prev) => prev + 1)}
        types={types}
        statuses={statuses}
      />
      <LocationStep
        className={cn({
          hidden: step !== 1,
        })}
        next={() => setStep((prev) => prev + 1)}
        back={() => setStep((prev) => prev - 1)}
      />
    </div>
  );
};

export default AddPropertyForm;
