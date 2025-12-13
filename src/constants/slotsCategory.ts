export const slotsCategory = [
  { name: "MORNING", id: "MORNING", value: 1 },
  { name: "AFTERNOON", id: "AFTERNOON", value: 1 },
  { name: "EVENING", id: "EVENING", value: 1 },
  { name: "FIRST HALF", id: "FirstHalf", value: 1.5 },
  { name: "SECOND HALF", id: "SecondHalf", value: 1.5 },
  { name: "FULL DAY", id: "FullDay", value: 3 },
];

export const slotRanges: any = {
  MORNING: { start: 8, end: 12 }, // 4 hrs
  AFTERNOON: { start: 12, end: 16 }, // 4 hrs
  EVENING: { start: 16, end: 20 }, // 4 hrs
  FIRSTHALF: { start: 8, end: 16 }, // 8 hrs (Morning + Afternoon)
  SECONDHALF: { start: 12, end: 20 }, // 8 hrs (Afternoon + Evening)
  FULLDAY: { start: 8, end: 20 }, // all 3 slots
};
