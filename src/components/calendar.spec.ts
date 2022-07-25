import { getAllDaysInMonth } from "./Calendar";

describe("Calendar", () => {
  it("getAllDaysInMonth", () => {
    const result = getAllDaysInMonth(2022, 6);

    expect(result).toHaveLength(31);

    const lastDate = result[30];
    expect(lastDate.getDay()).toEqual(0);

    const firstDate = result[0];
    expect(firstDate.getDay()).toEqual(5);
  });
});
