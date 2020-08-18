import React, { useState } from "react";
import { DatePicker, Typography } from "antd";
import moment from "moment";
import "./styles.css";

const { Text } = Typography;
const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";

export default function DatePickerMult(props) {
  const [dates, setDates] = useState();
  const { titulo, onChange } = props;

  const disabledDate = (current) => {
    if (!dates || dates.length === 0) {
      return false;
    }
    const tooLate = dates[0] && current.diff(dates[0], "days") > 100;

    return tooLate;
  };
  return (
    <div className="datepicket-mult">
      <Text>{titulo}</Text>
      <RangePicker
        disabledDate={disabledDate}
        placeholder={["Fecha Incial", "Fecha Final"]}
        defaultValue={[
          moment(new Date(), dateFormat),
          moment(new Date(), dateFormat),
        ]}
        onCalendarChange={(value) => {
          setDates(value);
          onChange(value);
        }}
        size="small"
      />
    </div>
  );
}
