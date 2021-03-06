import { makeRangeStatus, rangeHelper } from "../rangeHelper";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import jalaliday from "jalaliday";
import { cleanup } from "react-testing-library";

dayjs.extend(jalaliday);
dayjs.extend(isSameOrBefore);

describe("rangeHelper test ", () => {
  afterEach(cleanup);
  test("range acceptance test ", () => {
    const range = {
      start: dayjs("Tue, 25 Dec 2018 20:01:44 GMT"),
      end: dayjs("Sat, 29 Dec 2018 20:01:44 GMT"),
    };
    expect(rangeHelper(range)).toEqual({
      "1397/10/04": { status: "startRange" },
      "1397/10/05": { status: "continueRange" },
      "1397/10/06": { status: "continueRange" },
      "1397/10/07": { status: "continueRange" },
      "1397/10/08": { status: "endRange" },
    });
  });

  test("when start range and end range are equal ", () => {
    const range = {
      start: dayjs("Tue, 25 Dec 2018 20:01:44 GMT"),
      end: dayjs("Tue, 25 Dec 2018 20:01:44 GMT"),
    };

    // ToDo: change this status with currentDay or something
    expect(rangeHelper(range)).toEqual({
      "1397/10/04": { status: "sameRange" },
    });
  });

  test("when end range before start ", () => {
    const range = {
      start: dayjs("Sat, 29 Dec 2018 20:01:44 GMT"),
      end: dayjs("Tue, 25 Dec 2018 20:01:44 GMT"),
    };
    expect(rangeHelper(range)).toEqual({});
  });
});

describe("rangeHelper status", () => {
  test("status ", () => {
    const range = {
      start: dayjs("Tue, 25 Dec 2018 20:01:44 GMT"),
      end: dayjs("Sat, 29 Dec 2018 20:01:44 GMT"),
    };

    expect(makeRangeStatus(range.start, range.end)).toBe("04 تا 08 دی ماه");
  });

  test("when end range before start ", () => {
    const range = {
      start: dayjs("Sat, 29 Dec 2018 20:01:44 GMT"),
      end: dayjs("Tue, 25 Dec 2018 20:01:44 GMT"),
    };
    expect(makeRangeStatus(range.start, range.end)).toEqual("08 دی ماه");
  });

  test("when start and date into separate months", () => {
    const range = {
      start: dayjs("Sat, 29 Dec 2018 20:01:44 GMT"),
      end: dayjs("Fri, 01 Feb 2019 00:41:54 GMT"),
    };
    expect(makeRangeStatus(range.start, range.end)).toEqual("08 دی تا 12 بهمن");
  });
});
