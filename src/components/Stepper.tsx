import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";

interface Props {
  items: { label: string }[];
  activeItem: number;
  setActiveItem: (index: number) => void;
  className?: string;
}

const Stepper = ({ items, activeItem, setActiveItem, className }: Props) => {
  return (
    <div className="flex justify-evenly">
      {items.map((item, index) => (
        <div className="flex flex-grow" key={index}>
          <div className="flex flex-col items-center gap-2">
            <div
              {...(index < activeItem && {
                onClick: () => setActiveItem(index),
              })}
              className={cn(
                "rounded-full w-6 h-6 justify-center items-center transition flex",
                className,
                {
                  "bg-rose-600 text-white": index === activeItem,
                  "bg-gray-400 text-white": index > activeItem,
                  "bg-rose-800 text-white": index < activeItem,
                  "cursor-pointer": index <= activeItem,
                }
              )}
            >
              {index + 1}
            </div>
            <p>{item.label}</p>
          </div>
          {index !== items.length - 1 && (
            <Separator
              className={cn(
                "w-[80%] bg-rose-500 mt-2 relative after:absolute after:left-0 after:top-0 after:border after:transition-all after:duration-300 after:ease-in",
                {
                  "after:w-full after:border-rose-500": index < activeItem,
                  "after:w-0": index >= activeItem,
                }
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
