import clsx from "clsx";
type Helper3Props = {
  additionalClassNames?: string;
};

function Helper3({ additionalClassNames = "" }: Helper3Props) {
  return (
    <div className={clsx("absolute content-stretch flex flex-col gap-[15px] items-start w-[236px]", additionalClassNames)}>
      <div className="bg-[#d9d9d9] h-[164px] shrink-0 w-full" />
      <Helper2 text="Date | Category | Category" text1="Project titles" />
    </div>
  );
}
type Helper2Props = {
  text: string;
  text1: string;
};

function Helper2({ text, text1 }: Helper2Props) {
  return (
    <div className="h-[148px] leading-[normal] not-italic relative shrink-0 text-black w-full">
      <p className="absolute font-['Encode_Sans_Condensed:Regular',sans-serif] left-[7px] text-[12px] text-nowrap top-0">{text}</p>
      <p className="absolute font-['Encode_Sans_Condensed:Bold',sans-serif] left-0 text-[18px] text-nowrap top-[20px]">{text1}</p>
      <Helper />
    </div>
  );
}
type Helper1Props = {
  text: string;
  text1: string;
  text2: string;
  additionalClassNames?: string;
};

function Helper1({ text, text1, text2, additionalClassNames = "" }: Helper1Props) {
  return (
    <div className={clsx("absolute h-[148px] leading-[normal] left-[349px] not-italic text-black w-[489px]", additionalClassNames)}>
      <p className="absolute font-['Encode_Sans_Condensed:Regular',sans-serif] left-[7px] text-[12px] text-nowrap top-0">{text}</p>
      <p className="absolute font-['Encode_Sans_Condensed:Regular',sans-serif] left-[7px] text-[12px] text-nowrap top-[133px]">{text1}</p>
      <p className="absolute font-['Iowan_Old_Style:Bold',sans-serif] left-0 text-[24px] text-nowrap top-[20px]">{text2}</p>
      <p className="absolute font-['Iowan_Old_Style:Bold',sans-serif] h-[44px] left-[7px] text-[12px] top-[84px] w-[482px]">{`The "Starlight Lantern" project involved designing and constructing energy-efficient streetlights for the city of Lumina. These lanterns use advanced LED technology and are powered by solar panels, reducing the city's carbon footprint.`}</p>
    </div>
  );
}

function Helper() {
  return <p className="absolute font-['Iowan_Old_Style:Bold',sans-serif] h-[83px] left-[7px] text-[12px] top-[62px] w-[222px]">{`The "Starlight Lantern" project involved designing and constructing energy-efficient streetlights for the city of Lumina. These lanterns use advanced LED technology and `}</p>;
}
type ProjectProps = {
  text: string;
  text1: string;
  additionalClassNames?: string;
};

function Project({ text, text1, additionalClassNames = "" }: ProjectProps) {
  return (
    <div className={clsx("absolute h-[145px] leading-[normal] left-[854px] not-italic text-black w-[224px]", additionalClassNames)}>
      <p className="absolute font-['Encode_Sans_Condensed:Regular',sans-serif] left-0 text-[10px] text-nowrap top-0">{text}</p>
      <p className="absolute font-['Encode_Sans_Condensed:Bold',sans-serif] left-px text-[18px] text-nowrap top-[21px]">{text1}</p>
      <p className="absolute font-['Iowan_Old_Style:Bold',sans-serif] h-[75px] left-0 text-[12px] top-[70px] w-[224px]">{`The "Starlight Lantern" project involved designing and constructing energy-efficient streetlights for the city of Lumina. These lanterns use advanced LED technology and `}</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute bg-[#8a8a8a] content-stretch flex items-center justify-center left-[541px] p-[10px] top-[2283px] w-[342px]">
      <p className="font-['Iowan_Old_Style:Bold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[12px] text-black text-nowrap">Button</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute content-stretch flex font-['Encode_Sans_Condensed:Regular',sans-serif] gap-[16px] items-center leading-[normal] left-[324px] not-italic text-[12px] text-black text-nowrap top-[197px]">
      <p className="relative shrink-0">HOME</p>
      <p className="relative shrink-0">ABOUT</p>
      <p className="relative shrink-0">ABOUT</p>
      <p className="relative shrink-0">ABOUT</p>
      <p className="relative shrink-0">ABOUT</p>
      <p className="relative shrink-0">ABOUT</p>
      <p className="relative shrink-0">ABOUT</p>
      <p className="relative shrink-0">ABOUT</p>
      <p className="relative shrink-0">ABOUT</p>
      <p className="relative shrink-0">ABOUT</p>
      <p className="relative shrink-0">ABOUT</p>
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute contents leading-[normal] left-[112px] text-black top-[1140px]">
      <p className="absolute font-['Iowan_Old_Style:Bold',sans-serif] h-[56px] left-[158px] not-italic text-[12px] top-[1145px] w-[144px]">Project paragraph</p>
      <p className="absolute font-['Iowan_Old_Style:Bold_Italic',sans-serif] italic left-[112px] text-[45px] text-nowrap top-[1140px]">1</p>
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute contents leading-[normal] left-[112px] text-black top-[1216px]">
      <p className="absolute font-['Iowan_Old_Style:Bold',sans-serif] h-[56px] left-[158px] not-italic text-[12px] top-[1221px] w-[144px]">Project paragraph</p>
      <p className="absolute font-['Iowan_Old_Style:Bold_Italic',sans-serif] italic left-[112px] text-[45px] text-nowrap top-[1216px]">2</p>
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents leading-[normal] left-[112px] text-black top-[1292px]">
      <p className="absolute font-['Iowan_Old_Style:Bold',sans-serif] h-[56px] left-[158px] not-italic text-[12px] top-[1297px] w-[144px]">Project paragraph</p>
      <p className="absolute font-['Iowan_Old_Style:Bold_Italic',sans-serif] italic left-[112px] text-[45px] text-nowrap top-[1292px]">3</p>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents leading-[normal] left-[112px] text-black top-[1368px]">
      <p className="absolute font-['Iowan_Old_Style:Bold',sans-serif] h-[56px] left-[158px] not-italic text-[12px] top-[1373px] w-[144px]">Project paragraph</p>
      <p className="absolute font-['Iowan_Old_Style:Bold_Italic',sans-serif] italic left-[112px] text-[45px] text-nowrap top-[1368px]">4</p>
    </div>
  );
}

function Group8() {
  return (
    <div className="absolute contents leading-[normal] left-[112px] text-black top-[1444px]">
      <p className="absolute font-['Iowan_Old_Style:Bold',sans-serif] h-[56px] left-[158px] not-italic text-[12px] top-[1449px] w-[144px]">Project paragraph</p>
      <p className="absolute font-['Iowan_Old_Style:Bold_Italic',sans-serif] italic left-[112px] text-[45px] text-nowrap top-[1444px]">5</p>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents leading-[normal] left-[113px] not-italic text-[12px] text-black text-nowrap top-[277px]">
      <p className="absolute font-['Encode_Sans_Condensed:Regular',sans-serif] left-[113px] top-[277px]">COMPANIES</p>
      <p className="absolute font-['Iowan_Old_Style:Bold',sans-serif] left-[123px] top-[315px]">{`{COMPANY NAME} • DATE`}</p>
      <p className="absolute font-['Iowan_Old_Style:Bold',sans-serif] left-[123px] top-[361px]">{`{COMPANY NAME} • DATE`}</p>
      <p className="absolute font-['Iowan_Old_Style:Bold',sans-serif] left-[123px] top-[407px]">{`{COMPANY NAME} • DATE`}</p>
      <p className="absolute font-['Iowan_Old_Style:Bold',sans-serif] left-[123px] top-[446px]">{`{COMPANY NAME} • DATE`}</p>
      <p className="absolute font-['Iowan_Old_Style:Bold',sans-serif] left-[123px] top-[492px]">{`{COMPANY NAME} • DATE`}</p>
      <p className="absolute font-['Iowan_Old_Style:Bold',sans-serif] left-[123px] top-[538px]">{`{COMPANY NAME} • DATE`}</p>
      <p className="absolute font-['Iowan_Old_Style:Bold',sans-serif] left-[123px] top-[577px]">{`{COMPANY NAME} • DATE`}</p>
      <p className="absolute font-['Iowan_Old_Style:Bold',sans-serif] left-[123px] top-[616px]">{`{COMPANY NAME} • DATE`}</p>
      <p className="absolute font-['Iowan_Old_Style:Bold',sans-serif] left-[123px] top-[668px]">{`{COMPANY NAME} • DATE`}</p>
      <p className="absolute font-['Iowan_Old_Style:Bold',sans-serif] left-[123px] top-[709px]">{`{COMPANY NAME} • DATE`}</p>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents leading-[normal] left-[110px] not-italic text-[12px] text-black text-nowrap top-[1973px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal left-[110px] top-[1973px]">TOP QUALITIES</p>
      <p className="absolute font-['Iowan_Old_Style:Bold',sans-serif] left-[110px] top-[2014px]">Storytelling</p>
      <p className="absolute font-['Iowan_Old_Style:Bold',sans-serif] left-[200px] top-[2014px]">Design</p>
      <p className="absolute font-['Iowan_Old_Style:Bold',sans-serif] left-[220px] top-[2123px]">Design</p>
      <p className="absolute font-['Iowan_Old_Style:Bold',sans-serif] left-[168px] top-[2147px]">Design</p>
      <p className="absolute font-['Iowan_Old_Style:Bold',sans-serif] left-[116px] top-[2174px]">Design</p>
      <p className="absolute font-['Iowan_Old_Style:Bold',sans-serif] left-[116px] top-[2201px]">Design</p>
      <p className="absolute font-['Iowan_Old_Style:Bold',sans-serif] left-[221px] top-[2174px]">Design</p>
      <p className="absolute font-['Iowan_Old_Style:Bold',sans-serif] left-[200px] top-[2038px]">Prototyping</p>
      <p className="absolute font-['Iowan_Old_Style:Bold',sans-serif] left-[116px] top-[2065px]">Presenting</p>
      <p className="absolute font-['Iowan_Old_Style:Bold',sans-serif] left-[116px] top-[2038px]">Presenting</p>
      <p className="absolute font-['Iowan_Old_Style:Bold',sans-serif] left-[116px] top-[2089px]">Problem solving</p>
      <p className="absolute font-['Iowan_Old_Style:Bold',sans-serif] left-[116px] top-[2123px]">Problem solving</p>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-[110px] top-[1576px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[110px] not-italic text-[12px] text-black text-nowrap top-[1576px]">TOP QUALITIES</p>
      <div className="absolute bg-[#d9d9d9] h-[306px] left-[116px] top-[1609px] w-[175px]" />
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute contents left-[110px] top-[818px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[110px] not-italic text-[12px] text-black text-nowrap top-[818px]">TOP QUALITIES</p>
      <div className="absolute bg-[#d9d9d9] h-[144px] left-[116px] top-[851px] w-[175px]" />
    </div>
  );
}

function Group9() {
  return (
    <div className="absolute contents left-[348px] top-[1325px]">
      <p className="absolute font-['Iowan_Old_Style:Bold_Italic',sans-serif] italic leading-[normal] left-[357px] text-[45px] text-black text-nowrap top-[1325px]">Featured projects</p>
      <Helper3 additionalClassNames="left-[349px] top-[1424px]" />
      <Helper3 additionalClassNames="left-[602px] top-[1424px]" />
      <Helper3 additionalClassNames="left-[855px] top-[1424px]" />
      <Helper3 additionalClassNames="left-[855px] top-[1786px]" />
      <Helper3 additionalClassNames="left-[602px] top-[1786px]" />
      <Helper3 additionalClassNames="left-[348px] top-[1786px]" />
    </div>
  );
}

export default function Frame2() {
  return (
    <div className="bg-white relative size-full">
      <Frame1 />
      <p className="absolute font-['Iowan_Old_Style:Black',sans-serif] leading-[normal] left-[53px] not-italic text-[70px] text-black text-nowrap top-[65px]">THE PORTFOLIO PERVIEW</p>
      <Frame />
      <p className="absolute font-['Encode_Sans_Condensed:Regular',sans-serif] leading-[normal] left-[524px] not-italic text-[12px] text-black text-nowrap top-[150px]">A WEBSITE PORTFOLI FOR MARCEA ENNAMORATO</p>
      <Project text="APPLE WATCH" text1="Project title" additionalClassNames="top-[344px]" />
      <Project text="APPLE WATCH" text1="Project title" additionalClassNames="top-[528px]" />
      <Project text="APPLE WATCH" text1="Project title" additionalClassNames="top-[709px]" />
      <Project text="APPLE WATCH" text1="Project title" additionalClassNames="top-[893px]" />
      <Helper1 text="Date | Category | Category" text1="Link to read more" text2="Project titles" additionalClassNames="top-[721px]" />
      <Helper1 text="Date | Category | Category" text1="Link to read more" text2="Project titles" additionalClassNames="top-[919px]" />
      <Helper1 text="Date | Category | Category" text1="Link to read more" text2="Project titles" additionalClassNames="top-[1117px]" />
      <p className="absolute font-['Encode_Sans_Condensed:Regular',sans-serif] leading-[normal] left-[112px] not-italic text-[12px] text-black text-nowrap top-[1110px]">Reading list</p>
      <Group6 />
      <Group5 />
      <Group4 />
      <Group3 />
      <Group8 />
      <Group2 />
      <p className="absolute font-['Iowan_Old_Style:Bold',sans-serif] leading-[normal] left-[625px] not-italic text-[12px] text-black text-nowrap top-[2236px]">Sign up to hear more from me</p>
      <Group1 />
      <Group />
      <Group7 />
      <div className="absolute bg-[#d9d9d9] h-[361px] left-[349px] top-[348px] w-[482px]" />
      <Group9 />
      <p className="absolute font-['Iowan_Old_Style:Bold',sans-serif] leading-[normal] left-[110px] not-italic text-[12px] text-black text-nowrap top-[15px]">Date</p>
      <div className="absolute bg-[#d9d9d9] h-[390px] left-[125px] top-[2406px] w-[966px]" data-name="Footer" />
    </div>
  );
}