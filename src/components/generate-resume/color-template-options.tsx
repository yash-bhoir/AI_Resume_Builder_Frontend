import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { BsBan } from "react-icons/bs";
import { Palette } from "lucide-react";

const predefinedColors = [
  "#F97316", // Orange
  "#10B981", // Green
  "#3B82F6", // Blue
  "#9333EA", // Purple
  "#EF4444", // Red
  "#F59E0B", // Yellow
];

interface ColorTemplateOptionsProps {
  selectedColor: string;
  onChange: (color: string) => void;
}

const ColorTemplateOptions = ({
  selectedColor,
  onChange,
}: ColorTemplateOptionsProps) => {
  const [customColor, setCustomColor] = useState<string>("");

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setCustomColor(color);
    onChange(color);
  };

  return (
    <div className="w-full flex flex-col items-start gap-2">
      <h1 className="text-sm font-semibold text-neutral-500 capitalize dark:text-neutral-400">
        Choose color template
      </h1>

      <RadioGroup
        value={selectedColor}
        onValueChange={onChange}
        className="flex flex-wrap gap-3"
      >
        {/* None Option */}
        <div
          className={`flex items-center justify-center gap-2 w-[40px] h-[40px] rounded-md border-2 cursor-pointer ${
            selectedColor == "none"
              ? "border-indigo-500"
              : "border-neutral-400"
          }`}
        >
          <RadioGroupItem value="none" id="none" className="hidden" />
          <Label htmlFor="none" className="w-full h-full flex items-center justify-center cursor-pointer">
            <BsBan className="size-4 text-neutral-500 dark:text-neutral-400" />
          </Label>
        </div>

        {/* Predefined Colors */}
        {predefinedColors.map((color) => (
          <div
            key={color}
            className={`w-[40px] h-[40px] rounded-md border-2 p-1 cursor-pointer ${
              selectedColor == color
                ? "border-indigo-500"
                : "border-neutral-400"
            }`}
          >
            <RadioGroupItem value={color} id={color} className="hidden" />
            <Label
              htmlFor={color}
              className="w-full h-full rounded-md flex items-center justify-center cursor-pointer"
              style={{ backgroundColor: color }}
            ></Label>
          </div>
        ))}

        <div className="relative">
          <RadioGroupItem
            value={customColor}
            id="customColor"
            className="hidden"
          />
          <div
            className={`flex items-center justify-center gap-2 w-[40px] h-[40px] rounded-md border-2 cursor-pointer ${
              selectedColor === customColor
                ? "border-indigo-500"
                : "border-neutral-400 dark:border-neutral-600"
            }`}
          >
            {/* Icon */}
            <Palette className="size-5 text-neutral-500" />
            <Input
              type="color"
              value={customColor}
              onChange={handleCustomColorChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </div>
      </RadioGroup>
    </div>
  );
};

export default ColorTemplateOptions;
