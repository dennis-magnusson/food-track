import { format } from "date-fns";

const loadingDayContext = {
  date: format(new Date(), "yyyy-MM-dd"),
  meals: {
    breakfast: {
      id: 0,
      entries: [],
    },
    lunch: {
      id: 1,
      entries: [],
    },
    dinner: {
      id: 2,
      entries: [],
    },
    snack: {
      id: 3,
      entries: [],
    },
  },
  loading: true,
};

export default loadingDayContext;
