import svgPaths from "./svg-lnh7h9ybts";

function Component3D() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="3d">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="3d">
          <path d={svgPaths.p150f0b80} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

export default function Button() {
  return (
    <div className="bg-[#efefef] content-stretch flex gap-[8px] items-center justify-center px-[16px] py-[8px] relative rounded-[200px] size-full" data-name="Button">
      <Component3D />
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[16px] text-black">Label</p>
      <Component3D />
    </div>
  );
}