// мої підказки
const filterByTopic = {
  topic: "Hobby",
};

// $gte більше дорівнює
// $lt - менше дорівнює
// $eq- дорівнює
// $ne - не дорівнює

// $or: [{}] - кобіноване значення

// $in 
const dateRangePicker = [
  {
    $match: {
      postDate: {
        $gte: new Date("Mon, 01 May 2023 00:00:00 GMT"),
        $lte: new Date("Mon, 22 May 2023 00:00:00 GMT"),
      },
    },
  },
];
