import svgPaths from "./svg-1dl4xw4hyz";

function Heading() {
  return (
    <div className="h-[36.002px] relative shrink-0 w-[78.303px]" data-name="Heading 1">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[36px] left-0 text-[30px] text-nowrap text-white top-[-2.39px]">Athar</p>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[19.982px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9816 19.9816">
        <g id="Icon">
          <path d="M4.16284 9.99081H15.8188" id="Vector" stroke="var(--stroke-0, #1F3C5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66513" />
          <path d="M9.99081 4.16284V15.8188" id="Vector_2" stroke="var(--stroke-0, #1F3C5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66513" />
        </g>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[25.589px] relative shrink-0 w-[62.131px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[25.6px] left-[31px] text-[#1f3c5b] text-[16px] text-center text-nowrap top-[-1.61px] translate-x-[-50%]">Get Help</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-white h-[44.336px] relative rounded-[10px] shrink-0 w-[124.869px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#1f3c5b] border-[1.386px] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.988px] items-center pl-[17.384px] pr-[1.386px] py-[1.386px] relative size-full">
        <Icon />
        <Text />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex h-[44.336px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Heading />
      <Button />
    </div>
  );
}

function SearchInput() {
  return (
    <div className="absolute bg-white h-[52.346px] left-0 rounded-[10px] top-0 w-[408.595px]" data-name="Search Input">
      <div className="content-stretch flex items-center overflow-clip pl-[44px] pr-[16px] py-[12px] relative rounded-[inherit] size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[16px] text-[rgba(31,60,91,0.5)] text-nowrap">Search for accessible places...</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#1f3c5b] border-[1.386px] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-[11.99px] size-[19.982px] top-[16.18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9816 19.9816">
        <g id="Icon">
          <path d={svgPaths.p32f5d100} id="Vector" stroke="var(--stroke-0, #1F3C5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66513" />
          <path d={svgPaths.p2c3f8b80} id="Vector_2" stroke="var(--stroke-0, #1F3C5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66513" />
        </g>
      </svg>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[52.346px] relative shrink-0 w-full" data-name="Container">
      <SearchInput />
      <Icon1 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[19.982px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9816 19.9816">
        <g clipPath="url(#clip0_55_348)" id="Icon">
          <path d={svgPaths.p13208e00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66513" />
        </g>
        <defs>
          <clipPath id="clip0_55_348">
            <rect fill="white" height="19.9816" width="19.9816" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[25.589px] relative shrink-0 w-[41.695px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[25.6px] left-[21px] text-[16px] text-center text-nowrap text-white top-[-1.61px] translate-x-[-50%]">Filters</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#2c4f73] h-[44.336px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#1f3c5b] border-[1.386px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[7.988px] items-center justify-center p-[1.386px] relative size-full">
          <Icon2 />
          <Text1 />
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="absolute bg-[#1f3c5b] content-stretch flex flex-col gap-[15.998px] h-[208.995px] items-start left-0 pb-0 pt-[23.987px] px-[15.998px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] top-0 w-[440.591px]" data-name="Header">
      <Container />
      <Container1 />
      <Button1 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[27.992px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[28px] left-0 text-[#1f3c5b] text-[20px] top-[-3px] w-[243px]">5 Accessible Places Nearby</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute bg-[#d6e4f5] content-stretch flex flex-col h-[53.364px] items-start left-0 pb-[1.386px] pt-[11.993px] px-[15.998px] top-0 w-[440.591px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-[0px_0px_1.386px] border-solid inset-0 pointer-events-none" />
      <Heading1 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[27.97px] overflow-clip relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[28px] left-0 text-[#1f3c5b] text-[18px] text-nowrap top-[-1.61px]">City Stars Mall</p>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[20.003px] relative shrink-0 w-[59.555px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#1f3c5b] text-[14px] text-nowrap">Shopping</p>
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[20.003px] relative shrink-0 w-[5.694px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="basis-0 font-['Arimo:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px relative shrink-0 text-[#1f3c5b] text-[14px]">•</p>
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[20.003px] relative shrink-0 w-[40.981px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#1f3c5b] text-[14px] text-nowrap">0.5 km</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex gap-[7.988px] h-[20.003px] items-center opacity-80 relative shrink-0 w-full" data-name="Container">
      <Text2 />
      <Text3 />
      <Text4 />
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[25.589px] relative shrink-0 w-[13.336px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[25.6px] left-0 text-[#c9a24d] text-[16px] text-nowrap top-[-1.61px]">★</p>
      </div>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[20.003px] relative shrink-0 w-[18.141px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#1f3c5b] text-[14px] text-nowrap">4.5</p>
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="h-[20.003px] opacity-60 relative shrink-0 w-[31.131px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#1f3c5b] text-[14px] top-[-2px] w-[32px]">(127)</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex gap-[3.983px] h-[25.589px] items-center relative shrink-0 w-full" data-name="Container">
      <Text5 />
      <Text6 />
      <Text7 />
    </div>
  );
}

function Container5() {
  return (
    <div className="basis-0 grow h-[81.528px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3.983px] items-start relative size-full">
        <Heading2 />
        <Container3 />
        <Container4 />
      </div>
    </div>
  );
}

function Text8() {
  return (
    <div className="absolute bg-[#d9b76d] border-[#c9a24d] border-[1.386px] border-solid h-[26.714px] left-0 rounded-[4px] top-0 w-[49.424px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16px] left-[7.99px] text-[#b38f3d] text-[12px] text-nowrap top-[2.98px]">Ramp</p>
    </div>
  );
}

function Text9() {
  return (
    <div className="absolute bg-[#d9b76d] border-[#c9a24d] border-[1.386px] border-solid h-[26.714px] left-0 rounded-[4px] top-[30.7px] w-[61.136px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16px] left-[7.99px] text-[#b38f3d] text-[12px] text-nowrap top-[2.98px]">Elevator</p>
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[57.412px] relative shrink-0 w-[95.99px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text8 />
        <Text9 />
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute content-stretch flex h-[81.528px] items-start justify-between left-[16px] top-[11.99px] w-[408.595px]" data-name="Container">
      <Container5 />
      <Container6 />
    </div>
  );
}

function Button2() {
  return (
    <div className="h-[106.901px] relative shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-[0px_0px_1.386px] border-solid inset-0 pointer-events-none" />
      <Container7 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[27.97px] overflow-clip relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[28px] left-0 text-[#1f3c5b] text-[18px] text-nowrap top-[-1.61px]">Giza Public Library</p>
    </div>
  );
}

function Text10() {
  return (
    <div className="h-[20.003px] relative shrink-0 w-[84.559px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#1f3c5b] text-[14px] text-nowrap">Public Service</p>
      </div>
    </div>
  );
}

function Text11() {
  return (
    <div className="h-[20.003px] relative shrink-0 w-[5.694px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="basis-0 font-['Arimo:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px relative shrink-0 text-[#1f3c5b] text-[14px]">•</p>
      </div>
    </div>
  );
}

function Text12() {
  return (
    <div className="h-[20.003px] relative shrink-0 w-[40.981px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#1f3c5b] text-[14px] text-nowrap">1.2 km</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex gap-[7.988px] h-[20.003px] items-center opacity-80 relative shrink-0 w-full" data-name="Container">
      <Text10 />
      <Text11 />
      <Text12 />
    </div>
  );
}

function Text13() {
  return (
    <div className="h-[25.589px] relative shrink-0 w-[13.336px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[25.6px] left-0 text-[#c9a24d] text-[16px] text-nowrap top-[-1.61px]">★</p>
      </div>
    </div>
  );
}

function Text14() {
  return (
    <div className="h-[20.003px] relative shrink-0 w-[18.141px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#1f3c5b] text-[14px] text-nowrap">4.8</p>
      </div>
    </div>
  );
}

function Text15() {
  return (
    <div className="h-[20.003px] opacity-60 relative shrink-0 w-[23.575px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#1f3c5b] text-[14px] top-[-2px] w-[24px]">(89)</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex gap-[3.983px] h-[25.589px] items-center relative shrink-0 w-full" data-name="Container">
      <Text13 />
      <Text14 />
      <Text15 />
    </div>
  );
}

function Container10() {
  return (
    <div className="basis-0 grow h-[81.528px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3.983px] items-start relative size-full">
        <Heading3 />
        <Container8 />
        <Container9 />
      </div>
    </div>
  );
}

function Text16() {
  return (
    <div className="absolute bg-[#d9b76d] border-[#c9a24d] border-[1.386px] border-solid h-[26.714px] left-0 rounded-[4px] top-0 w-[49.424px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16px] left-[7.99px] text-[#b38f3d] text-[12px] text-nowrap top-[2.98px]">Ramp</p>
    </div>
  );
}

function Text17() {
  return (
    <div className="absolute bg-[#d9b76d] border-[#c9a24d] border-[1.386px] border-solid h-[26.714px] left-0 rounded-[4px] top-[30.7px] w-[61.136px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16px] left-[7.99px] text-[#b38f3d] text-[12px] text-nowrap top-[2.98px]">Elevator</p>
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[57.412px] relative shrink-0 w-[95.99px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text16 />
        <Text17 />
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute content-stretch flex h-[81.528px] items-start justify-between left-[16px] top-[11.99px] w-[408.595px]" data-name="Container">
      <Container10 />
      <Container11 />
    </div>
  );
}

function Button3() {
  return (
    <div className="h-[106.901px] relative shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-[0px_0px_1.386px] border-solid inset-0 pointer-events-none" />
      <Container12 />
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[27.97px] overflow-clip relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[28px] left-0 text-[#1f3c5b] text-[18px] text-nowrap top-[-1.61px]">Orman Garden</p>
    </div>
  );
}

function Text18() {
  return (
    <div className="h-[20.003px] relative shrink-0 w-[65.314px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#1f3c5b] text-[14px] text-nowrap">Recreation</p>
      </div>
    </div>
  );
}

function Text19() {
  return (
    <div className="h-[20.003px] relative shrink-0 w-[5.694px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="basis-0 font-['Arimo:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px relative shrink-0 text-[#1f3c5b] text-[14px]">•</p>
      </div>
    </div>
  );
}

function Text20() {
  return (
    <div className="h-[20.003px] relative shrink-0 w-[40.981px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#1f3c5b] text-[14px] text-nowrap">2.1 km</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex gap-[7.988px] h-[20.003px] items-center opacity-80 relative shrink-0 w-full" data-name="Container">
      <Text18 />
      <Text19 />
      <Text20 />
    </div>
  );
}

function Text21() {
  return (
    <div className="h-[25.589px] relative shrink-0 w-[13.336px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[25.6px] left-0 text-[#c9a24d] text-[16px] text-nowrap top-[-1.61px]">★</p>
      </div>
    </div>
  );
}

function Text22() {
  return (
    <div className="h-[20.003px] relative shrink-0 w-[18.141px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#1f3c5b] text-[14px] text-nowrap">3.9</p>
      </div>
    </div>
  );
}

function Text23() {
  return (
    <div className="h-[20.003px] opacity-60 relative shrink-0 w-[23.575px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#1f3c5b] text-[14px] top-[-2px] w-[24px]">(54)</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex gap-[3.983px] h-[25.589px] items-center relative shrink-0 w-full" data-name="Container">
      <Text21 />
      <Text22 />
      <Text23 />
    </div>
  );
}

function Container15() {
  return (
    <div className="basis-0 grow h-[81.528px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3.983px] items-start relative size-full">
        <Heading4 />
        <Container13 />
        <Container14 />
      </div>
    </div>
  );
}

function Text24() {
  return (
    <div className="bg-[#d9b76d] h-[26.714px] relative rounded-[4px] shrink-0 w-[49.424px]" data-name="Text">
      <div aria-hidden="true" className="absolute border-[#c9a24d] border-[1.386px] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16px] left-[9.37px] text-[#b38f3d] text-[12px] text-nowrap top-[4.37px]">Ramp</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute content-stretch flex h-[81.528px] items-start justify-between left-[16px] top-[11.99px] w-[408.595px]" data-name="Container">
      <Container15 />
      <Text24 />
    </div>
  );
}

function Button4() {
  return (
    <div className="h-[106.901px] relative shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-[0px_0px_1.386px] border-solid inset-0 pointer-events-none" />
      <Container16 />
    </div>
  );
}

function Heading5() {
  return (
    <div className="h-[27.97px] overflow-clip relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[28px] left-0 text-[#1f3c5b] text-[18px] text-nowrap top-[-1.61px]">Giza Medical Center</p>
    </div>
  );
}

function Text25() {
  return (
    <div className="h-[20.003px] relative shrink-0 w-[66.201px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#1f3c5b] text-[14px] text-nowrap">Healthcare</p>
      </div>
    </div>
  );
}

function Text26() {
  return (
    <div className="h-[20.003px] relative shrink-0 w-[5.694px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="basis-0 font-['Arimo:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px relative shrink-0 text-[#1f3c5b] text-[14px]">•</p>
      </div>
    </div>
  );
}

function Text27() {
  return (
    <div className="h-[20.003px] relative shrink-0 w-[40.981px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#1f3c5b] text-[14px] text-nowrap">0.8 km</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex gap-[7.988px] h-[20.003px] items-center opacity-80 relative shrink-0 w-full" data-name="Container">
      <Text25 />
      <Text26 />
      <Text27 />
    </div>
  );
}

function Text28() {
  return (
    <div className="h-[25.589px] relative shrink-0 w-[13.336px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[25.6px] left-0 text-[#c9a24d] text-[16px] text-nowrap top-[-1.61px]">★</p>
      </div>
    </div>
  );
}

function Text29() {
  return (
    <div className="h-[20.003px] relative shrink-0 w-[18.141px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#1f3c5b] text-[14px] text-nowrap">4.6</p>
      </div>
    </div>
  );
}

function Text30() {
  return (
    <div className="h-[20.003px] opacity-60 relative shrink-0 w-[31.131px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#1f3c5b] text-[14px] top-[-2px] w-[32px]">(203)</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex gap-[3.983px] h-[25.589px] items-center relative shrink-0 w-full" data-name="Container">
      <Text28 />
      <Text29 />
      <Text30 />
    </div>
  );
}

function Container19() {
  return (
    <div className="basis-0 grow h-[81.528px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3.983px] items-start relative size-full">
        <Heading5 />
        <Container17 />
        <Container18 />
      </div>
    </div>
  );
}

function Text31() {
  return (
    <div className="absolute bg-[#d9b76d] border-[#c9a24d] border-[1.386px] border-solid h-[26.714px] left-0 rounded-[4px] top-0 w-[49.424px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16px] left-[7.99px] text-[#b38f3d] text-[12px] text-nowrap top-[2.98px]">Ramp</p>
    </div>
  );
}

function Text32() {
  return (
    <div className="absolute bg-[#d9b76d] border-[#c9a24d] border-[1.386px] border-solid h-[26.714px] left-0 rounded-[4px] top-[30.7px] w-[61.136px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16px] left-[7.99px] text-[#b38f3d] text-[12px] text-nowrap top-[2.98px]">Elevator</p>
    </div>
  );
}

function Container20() {
  return (
    <div className="h-[57.412px] relative shrink-0 w-[95.99px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text31 />
        <Text32 />
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute content-stretch flex h-[81.528px] items-start justify-between left-[16px] top-[11.99px] w-[408.595px]" data-name="Container">
      <Container19 />
      <Container20 />
    </div>
  );
}

function Button5() {
  return (
    <div className="h-[106.901px] relative shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-[0px_0px_1.386px] border-solid inset-0 pointer-events-none" />
      <Container21 />
    </div>
  );
}

function Heading6() {
  return (
    <div className="h-[27.97px] overflow-clip relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[28px] left-0 text-[#1f3c5b] text-[18px] text-nowrap top-[-1.61px]">Nile View Café</p>
    </div>
  );
}

function Text33() {
  return (
    <div className="h-[20.003px] relative shrink-0 w-[65.66px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#1f3c5b] text-[14px] text-nowrap">Restaurant</p>
      </div>
    </div>
  );
}

function Text34() {
  return (
    <div className="h-[20.003px] relative shrink-0 w-[5.694px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="basis-0 font-['Arimo:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px relative shrink-0 text-[#1f3c5b] text-[14px]">•</p>
      </div>
    </div>
  );
}

function Text35() {
  return (
    <div className="h-[20.003px] relative shrink-0 w-[40.981px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#1f3c5b] text-[14px] text-nowrap">1.5 km</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex gap-[7.988px] h-[20.003px] items-center opacity-80 relative shrink-0 w-full" data-name="Container">
      <Text33 />
      <Text34 />
      <Text35 />
    </div>
  );
}

function Text36() {
  return (
    <div className="h-[25.589px] relative shrink-0 w-[13.336px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[25.6px] left-0 text-[#c9a24d] text-[16px] text-nowrap top-[-1.61px]">★</p>
      </div>
    </div>
  );
}

function Text37() {
  return (
    <div className="h-[20.003px] relative shrink-0 w-[18.141px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#1f3c5b] text-[14px] text-nowrap">4.2</p>
      </div>
    </div>
  );
}

function Text38() {
  return (
    <div className="h-[20.003px] opacity-60 relative shrink-0 w-[23.575px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#1f3c5b] text-[14px] top-[-2px] w-[24px]">(76)</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex gap-[3.983px] h-[25.589px] items-center relative shrink-0 w-full" data-name="Container">
      <Text36 />
      <Text37 />
      <Text38 />
    </div>
  );
}

function Container24() {
  return (
    <div className="basis-0 grow h-[81.528px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3.983px] items-start relative size-full">
        <Heading6 />
        <Container22 />
        <Container23 />
      </div>
    </div>
  );
}

function Text39() {
  return (
    <div className="bg-[#d9b76d] h-[26.714px] relative rounded-[4px] shrink-0 w-[49.424px]" data-name="Text">
      <div aria-hidden="true" className="absolute border-[#c9a24d] border-[1.386px] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16px] left-[9.37px] text-[#b38f3d] text-[12px] text-nowrap top-[4.37px]">Ramp</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute content-stretch flex h-[81.528px] items-start justify-between left-[16px] top-[11.99px] w-[408.595px]" data-name="Container">
      <Container24 />
      <Text39 />
    </div>
  );
}

function Button6() {
  return (
    <div className="h-[105.515px] relative shrink-0 w-full" data-name="Button">
      <Container25 />
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute content-stretch flex flex-col h-[533.117px] items-start left-0 top-[53.36px] w-[440.591px]" data-name="Container">
      <Button2 />
      <Button3 />
      <Button4 />
      <Button5 />
      <Button6 />
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute bg-white border-[#1f3c5b] border-[1.386px_0px_0px] border-solid h-[223.998px] left-0 overflow-clip top-[650.63px] w-[440.591px]" data-name="Container">
      <Container2 />
      <Container26 />
    </div>
  );
}

function Iframe() {
  return <div className="absolute h-[441.63px] left-0 top-0 w-[440.591px]" data-name="Iframe" />;
}

function Container28() {
  return <div className="absolute bg-[#1f3c5b] border-[2.771px] border-solid border-white left-0 rounded-[4.64899e+07px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[19.982px] top-0" data-name="Container" />;
}

function Container29() {
  return <div className="absolute bg-[#1f3c5b] left-[-9.01px] opacity-[0.074] rounded-[4.64899e+07px] size-[38.005px] top-[-9.01px]" data-name="Container" />;
}

function Container30() {
  return (
    <div className="absolute left-[210.3px] size-[19.982px] top-[210.82px]" data-name="Container">
      <Container28 />
      <Container29 />
    </div>
  );
}

function Container31() {
  return <div className="absolute bg-[#c9a24d] h-[110.268px] left-[-29.62px] opacity-[0.029] rounded-[4.64899e+07px] top-[-34.13px] w-[91.244px]" data-name="Container" />;
}

function Icon3() {
  return (
    <div className="h-[41.995px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31.9966 41.9955">
        <path d={svgPaths.p2d9909b0} fill="var(--fill-0, #C9A24D)" id="Vector" />
      </svg>
      <div className="absolute inset-[23.81%_31.25%_47.62%_31.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.9987 11.9987">
          <path d={svgPaths.p196aaa00} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="absolute content-stretch flex flex-col h-[41.998px] items-start left-0 top-0 w-[31.997px]" data-name="Container">
      <Icon3 />
    </div>
  );
}

function Container33() {
  return <div className="absolute bg-black blur filter h-[7.988px] left-[4.01px] opacity-20 rounded-[4.64899e+07px] top-[39.98px] w-[23.987px]" data-name="Container" />;
}

function Container34() {
  return (
    <div className="absolute h-[41.998px] left-0 top-0 w-[31.997px]" data-name="Container">
      <Container31 />
      <Container32 />
      <Container33 />
    </div>
  );
}

function Container35() {
  return (
    <div className="absolute bg-white border-[#1f3c5b] border-[1.386px] border-solid h-[26.714px] left-[-41.89px] rounded-[4px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] top-[47.99px] w-[115.776px]" data-name="Container">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16px] left-[57.49px] text-[#1f3c5b] text-[12px] text-center text-nowrap top-[2.98px] translate-x-[-50%]">Giza Public Library</p>
    </div>
  );
}

function Button7() {
  return (
    <div className="absolute h-[41.998px] left-[500.49px] top-[257.99px] w-[31.997px]" data-name="Button">
      <Container34 />
      <Container35 />
    </div>
  );
}

function Container36() {
  return <div className="absolute bg-[#c9a24d] h-[110.268px] left-[-29.62px] opacity-[0.029] rounded-[4.64899e+07px] top-[-34.13px] w-[91.244px]" data-name="Container" />;
}

function Icon4() {
  return (
    <div className="h-[41.995px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31.9966 41.9955">
        <path d={svgPaths.p2d9909b0} fill="var(--fill-0, #C9A24D)" id="Vector" />
      </svg>
      <div className="absolute inset-[23.81%_31.25%_47.62%_31.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.9987 11.9987">
          <path d={svgPaths.p196aaa00} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="absolute content-stretch flex flex-col h-[41.998px] items-start left-0 top-0 w-[31.997px]" data-name="Container">
      <Icon4 />
    </div>
  );
}

function Container38() {
  return <div className="absolute bg-black blur filter h-[7.988px] left-[4.01px] opacity-20 rounded-[4.64899e+07px] top-[39.98px] w-[23.987px]" data-name="Container" />;
}

function Container39() {
  return (
    <div className="absolute h-[41.998px] left-0 top-0 w-[31.997px]" data-name="Container">
      <Container36 />
      <Container37 />
      <Container38 />
    </div>
  );
}

function Container40() {
  return (
    <div className="absolute bg-white border-[#1f3c5b] border-[1.386px] border-solid h-[26.714px] left-[-32.57px] rounded-[4px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] top-[47.99px] w-[97.137px]" data-name="Container">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16px] left-[47.49px] text-[#1f3c5b] text-[12px] text-center text-nowrap top-[2.98px] translate-x-[-50%]">Orman Garden</p>
    </div>
  );
}

function Button8() {
  return (
    <div className="absolute h-[41.998px] left-[438.75px] top-[-36.72px] w-[31.997px]" data-name="Button">
      <Container39 />
      <Container40 />
    </div>
  );
}

function Container41() {
  return <div className="absolute bg-[#c9a24d] h-[110.268px] left-[-29.62px] opacity-[0.029] rounded-[4.64899e+07px] top-[-34.13px] w-[91.245px]" data-name="Container" />;
}

function Icon5() {
  return (
    <div className="h-[41.995px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31.9966 41.9955">
        <path d={svgPaths.p2d9909b0} fill="var(--fill-0, #C9A24D)" id="Vector" />
      </svg>
      <div className="absolute inset-[23.81%_31.25%_47.62%_31.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.9987 11.9987">
          <path d={svgPaths.p196aaa00} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="absolute content-stretch flex flex-col h-[41.998px] items-start left-0 top-0 w-[31.997px]" data-name="Container">
      <Icon5 />
    </div>
  );
}

function Container43() {
  return <div className="absolute bg-black blur filter h-[7.988px] left-[4px] opacity-20 rounded-[4.64899e+07px] top-[39.98px] w-[23.987px]" data-name="Container" />;
}

function Container44() {
  return (
    <div className="absolute h-[41.998px] left-0 top-0 w-[31.997px]" data-name="Container">
      <Container41 />
      <Container42 />
      <Container43 />
    </div>
  );
}

function Container45() {
  return (
    <div className="absolute bg-white border-[#1f3c5b] border-[1.386px] border-solid h-[26.714px] left-[-46.3px] rounded-[4px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] top-[47.99px] w-[124.587px]" data-name="Container">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16px] left-[61.49px] text-[#1f3c5b] text-[12px] text-center text-nowrap top-[2.98px] translate-x-[-50%]">Giza Medical Center</p>
    </div>
  );
}

function Button9() {
  return (
    <div className="absolute h-[41.998px] left-[338.56px] top-[314.51px] w-[31.997px]" data-name="Button">
      <Container44 />
      <Container45 />
    </div>
  );
}

function Container46() {
  return <div className="absolute bg-[#c9a24d] h-[110.268px] left-[-29.62px] opacity-[0.029] rounded-[4.64899e+07px] top-[-34.13px] w-[91.244px]" data-name="Container" />;
}

function Icon6() {
  return (
    <div className="h-[41.995px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31.9966 41.9955">
        <path d={svgPaths.p2d9909b0} fill="var(--fill-0, #C9A24D)" id="Vector" />
      </svg>
      <div className="absolute inset-[23.81%_31.25%_47.62%_31.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.9987 11.9987">
          <path d={svgPaths.p196aaa00} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="absolute content-stretch flex flex-col h-[41.998px] items-start left-0 top-0 w-[31.997px]" data-name="Container">
      <Icon6 />
    </div>
  );
}

function Container48() {
  return <div className="absolute bg-black blur filter h-[7.988px] left-[4.01px] opacity-20 rounded-[4.64899e+07px] top-[39.98px] w-[23.987px]" data-name="Container" />;
}

function Container49() {
  return (
    <div className="absolute h-[41.998px] left-0 top-0 w-[31.997px]" data-name="Container">
      <Container46 />
      <Container47 />
      <Container48 />
    </div>
  );
}

function Container50() {
  return (
    <div className="absolute bg-white border-[#1f3c5b] border-[1.386px] border-solid h-[26.714px] left-[-31.63px] rounded-[4px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] top-[47.99px] w-[95.254px]" data-name="Container">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16px] left-[46.49px] text-[#1f3c5b] text-[12px] text-center text-nowrap top-[2.98px] translate-x-[-50%]">Nile View Café</p>
    </div>
  );
}

function Button10() {
  return (
    <div className="absolute h-[41.998px] left-[552.93px] top-[171.87px] w-[31.997px]" data-name="Button">
      <Container49 />
      <Container50 />
    </div>
  );
}

function Container51() {
  return (
    <div className="absolute h-[441.63px] left-0 top-0 w-[440.591px]" data-name="Container">
      <Container30 />
      <Button7 />
      <Button8 />
      <Button9 />
      <Button10 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="absolute left-[16px] size-[23.987px] top-[11.99px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.9866 23.9866">
        <g id="Icon">
          <path d={svgPaths.p3de7ab00} id="Vector" stroke="var(--stroke-0, #1F3C5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99888" />
          <path d={svgPaths.p36fc100} id="Vector_2" stroke="var(--stroke-0, #1F3C5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99888" />
          <path d="M10.9939 7.99553V13.9922" id="Vector_3" stroke="var(--stroke-0, #1F3C5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99888" />
          <path d="M7.99553 10.9939H13.9922" id="Vector_4" stroke="var(--stroke-0, #1F3C5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99888" />
        </g>
      </svg>
    </div>
  );
}

function Button11() {
  return (
    <div className="absolute border-[#1f3c5b] border-[0px_0px_1.386px] border-solid h-[49.359px] left-[1.39px] top-[1.39px] w-[55.983px]" data-name="Button">
      <Icon7 />
    </div>
  );
}

function Icon8() {
  return (
    <div className="absolute left-[16px] size-[23.987px] top-[11.99px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.9866 23.9866">
        <g id="Icon">
          <path d={svgPaths.p3de7ab00} id="Vector" stroke="var(--stroke-0, #1F3C5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99888" />
          <path d={svgPaths.p36fc100} id="Vector_2" stroke="var(--stroke-0, #1F3C5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99888" />
          <path d="M7.99553 10.9939H13.9922" id="Vector_3" stroke="var(--stroke-0, #1F3C5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99888" />
        </g>
      </svg>
    </div>
  );
}

function Button12() {
  return (
    <div className="absolute h-[47.973px] left-[57.37px] top-[1.39px] w-[55.983px]" data-name="Button">
      <Icon8 />
    </div>
  );
}

function Container52() {
  return (
    <div className="bg-white h-[52.13px] relative rounded-[10px] shrink-0 w-[114.737px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <Button11 />
        <Button12 />
      </div>
      <div aria-hidden="true" className="absolute border-[#1f3c5b] border-[1.386px] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Icon9() {
  return (
    <div className="h-[23.987px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%_8.33%_12.5%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.26%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.9883 20.9883">
            <path d={svgPaths.p25b1580} id="Vector" stroke="var(--stroke-0, #1F3C5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99888" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button13() {
  return (
    <div className="bg-white h-[50.744px] relative rounded-[10px] shrink-0 w-[114.737px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#1f3c5b] border-[1.386px] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[1.386px] pl-[13.379px] pr-[77.372px] pt-[13.379px] relative size-full">
        <Icon9 />
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[7.988px] h-[110.862px] items-start left-[309.86px] top-[314.77px] w-[114.737px]" data-name="Container">
      <Container52 />
      <Button13 />
    </div>
  );
}

function Container54() {
  return (
    <div className="absolute bg-[#d6e4f5] h-[441.63px] left-0 overflow-clip top-[209px] w-[440.591px]" data-name="Container">
      <Iframe />
      <Container51 />
      <Container53 />
    </div>
  );
}

function MapView() {
  return (
    <div className="bg-[#eaf2fb] h-[874.623px] relative shrink-0 w-[440.591px]" data-name="MapView">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <Header />
        <Container27 />
        <Container54 />
      </div>
    </div>
  );
}

function Icon10() {
  return (
    <div className="relative shrink-0 size-[27.992px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.9916 27.9916">
        <g id="Icon">
          <path d={svgPaths.p1e5d7e00} id="Vector" stroke="var(--stroke-0, #1F3C5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.91579" />
          <path d="M17.4947 6.72262V24.2174" id="Vector_2" stroke="var(--stroke-0, #1F3C5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.91579" />
          <path d="M10.4968 3.77422V21.269" id="Vector_3" stroke="var(--stroke-0, #1F3C5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.91579" />
        </g>
      </svg>
    </div>
  );
}

function Text40() {
  return (
    <div className="h-[20.003px] relative shrink-0 w-[27.927px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#1f3c5b] text-[14px] text-center text-nowrap">Map</p>
      </div>
    </div>
  );
}

function Button14() {
  return (
    <div className="basis-0 grow h-[79.991px] min-h-px min-w-px relative shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3.983px] items-center justify-center relative size-full">
        <Icon10 />
        <Text40 />
      </div>
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[27.992px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.9916 27.9916">
        <g clipPath="url(#clip0_55_325)" id="Icon">
          <path d={svgPaths.pe2d5180} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.91579" />
        </g>
        <defs>
          <clipPath id="clip0_55_325">
            <rect fill="white" height="27.9916" width="27.9916" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text41() {
  return (
    <div className="h-[20.003px] relative shrink-0 w-[55.377px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#99a1af] text-[14px] text-center text-nowrap">Requests</p>
      </div>
    </div>
  );
}

function Button15() {
  return (
    <div className="basis-0 grow h-[79.991px] min-h-px min-w-px relative shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3.983px] items-center justify-center relative size-full">
        <Icon11 />
        <Text41 />
      </div>
    </div>
  );
}

function Icon12() {
  return (
    <div className="relative shrink-0 size-[27.992px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.9916 27.9916">
        <g id="Icon">
          <path d={svgPaths.p33b8c7c0} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.91579" />
          <path d={svgPaths.p3ff12100} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.91579" />
        </g>
      </svg>
    </div>
  );
}

function Text42() {
  return (
    <div className="h-[20.003px] relative shrink-0 w-[39.379px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#99a1af] text-[14px] text-center text-nowrap">Profile</p>
      </div>
    </div>
  );
}

function Button16() {
  return (
    <div className="basis-0 grow h-[79.991px] min-h-px min-w-px relative shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3.983px] items-center justify-center relative size-full">
        <Icon12 />
        <Text42 />
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="content-stretch flex h-[79.991px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Button14 />
      <Button15 />
      <Button16 />
    </div>
  );
}

function Navigation() {
  return (
    <div className="bg-white h-[81.377px] relative shrink-0 w-[440.591px]" data-name="Navigation">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-[1.386px_0px_0px] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[1.385px] px-0 relative size-full">
        <Container55 />
      </div>
    </div>
  );
}

function AppContent() {
  return (
    <div className="absolute bg-[#eaf2fb] content-stretch flex flex-col h-[956px] items-start left-0 top-0 w-[440.591px]" data-name="AppContent">
      <MapView />
      <Navigation />
    </div>
  );
}

function AppContent1() {
  return (
    <div className="absolute bg-[#c9a24d] h-[31.953px] left-[340.1px] rounded-[4.64899e+07px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] top-[828.06px] w-[84.494px]" data-name="AppContent">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16px] left-[41.99px] text-[12px] text-center text-nowrap text-white top-[6.99px] translate-x-[-50%]">Switch Role</p>
    </div>
  );
}

export default function AccessibilityMappingAppMvp() {
  return (
    <div className="bg-[#eaf2fb] relative size-full" data-name="Accessibility Mapping App MVP">
      <AppContent />
      <AppContent1 />
    </div>
  );
}