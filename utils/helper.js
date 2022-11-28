import { useRouter } from "next/router";
import moment from "moment";

export const getAccessToken = () => {
  const token = process.browser
    ? localStorage.getItem("token")
      ? localStorage.getItem("token")
      : false
    : false;
  return token;
};

export const lsitForDropdown = (data) => {
  const api = [];
  const finalData = data.map((md) =>
    md.childCategories.map((child) => {
      api.push({
        cat: md.name,
        id: child.id,
        key: child.name,
      });
      return {
        cat: md.name,
        id: child.id,
        key: child.name,
      };
    })
  );

  return [...api];
};

export const userSelectedData = (data, userdata) => {
  // console.log("all data", data, userdata);
  const filterdata = data.filter((interstdata) => {
    return userdata.some((id) => {
      // console.log("id", interstdata.id);
      return id == interstdata.id ? true : false;
    });
  });

  return filterdata;
  // console.log("fillter data", filterdata);
};

export const getRole = () => {
  const token = process.browser
    ? localStorage.getItem("role")
      ? localStorage.getItem("role")
      : false
    : false;

  return token;
};

export const getlocalStorageData = () => {
  if (localStorage?.token) {
    return {
      name: localStorage.getItem("role"),
    };
  }
};

export const getEventTypes = (eventsData) => {
  const event = eventsData?.map((data) => {
    return {
      value: data.id,
      label: data.name,
    };
  });
  return event;
};

export const geteventCategory = (categoryData) => {
  const event = categoryData?.map((data) => {
    return {
      value: data.id,
      label: data.name,
    };
  });

  return event;
};

export const geteSubCatagoryData = (eventCategory, value) => {
  const data = eventCategory.filter((data) => {
    return (
      value === data.id && {
        data: data,
      }
    );
  });

  const subCategory = data[0]?.childCategories.map((data) => {
    return {
      value: data.id,
      label: data.name,
    };
  });

  return subCategory;
};

// const getC

export const getDateArray = () => {
  const day = moment().isoWeekday();
  return [
    {
      startDate: moment().toISOString(),
      name: "Today",
      endDate: moment().endOf("day").toISOString(),
      value: "Today",
      dt: "TODAY",
    },
    {
      startDate: moment().endOf("day").toISOString(),
      name: "Tomorow",
      endDate: moment().endOf("day").add(1, "day").toISOString(),
      value: "Tomorow",
      dt: "TOMORROW",
    },

    {
      startDate: moment().toISOString(),
      name: "This Week",
      endDate: moment().endOf("week").add(-1, "day").toISOString(),
      value: "This Week",
      dt: "THIS_WEEK",
    },

    {
      startDate: moment().endOf("week").add(-1, "day").toISOString(),
      name: "This Weekend",
      endDate: moment().endOf("week").add(1, "day").toISOString(),
      value: "This Weekend",
      dt: "THIS_WEEKEND",
    },
    {
      startDate: moment().toISOString(),
      name: "This Month",
      endDate: moment().startOf("month").add(1, "month").toISOString(),
      value: "This Month",
      dt: "THIS_MONTH",
    },
    {
      startDate: moment().startOf("month").add(1, "month").toISOString(),
      name: "Next Month",
      endDate: moment().startOf("month").add(2, "month").toISOString(),
      value: "Next Month",
      dt: "NEXT_MONTH",
    },
    {
      name: "Custom",
      value: "Custom",
      custom: true,
      dt: "CUSTOM",
    },
  ];
};
