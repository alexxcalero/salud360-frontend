import { DateTime } from "luxon";

const Time = ({
  type,
  dateTime,
}: {
  type: "datetime" | "time";
  dateTime?: DateTime;
}) => {
  return (
    <time
      dateTime={
        (type === "datetime" ? dateTime?.toISO() : dateTime?.toFormat("T")) ??
        undefined
      }
    >
      {dateTime?.toFormat(type === "datetime" ? "D" : "t")}
    </time>
  );
};

export default Time;
