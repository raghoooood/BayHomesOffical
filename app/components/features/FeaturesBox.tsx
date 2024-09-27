'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";

interface FeaturesBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
}

const FeaturesBox: React.FC<FeaturesBoxProps> = ({
  icon: Icon,
  label,
  selected
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    const currentQuery = params ? new URLSearchParams(params.toString()) : new URLSearchParams();

    if (selected) {
      currentQuery.delete('features');
    } else {
      currentQuery.set('features', label);
    }

    const url = `/?${currentQuery.toString()}`;
    router.push(url);
  }, [label, selected, params, router]);

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col items-center justify-center gap-2 border-b-2 hover:text-neutral-800 transition cursor-pointer ${selected ? 'border-b-neutral-800 text-neutral-800' : 'border-transparent text-neutral-500'}`}>
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default FeaturesBox;
