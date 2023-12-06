function isDateRangeOverlap(newFrom, newTo, existingFrom, existingTo) {
  return (
    (newFrom >= existingFrom && newFrom <= existingTo) ||
    (newTo >= existingFrom && newTo <= existingTo) ||
    (newFrom <= existingFrom && newTo >= existingTo)
  );
}

export function toLowerCaseNonAccentVietnamese(str) {
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
  return str;
}

export const diffDays = (from, to) => {
  const day = 24 * 60 * 60 * 1000;
  const start = new Date(from);
  const end = new Date(to);
  return Math.round(Math.abs((start - end) / day));
};


export function isOverlapWithExistingRanges(newFrom, newTo, existingRanges) {
  for (const order of existingRanges) {
    const existingFrom = new Date(order.from).getTime();
    const existingTo = new Date(order.to).getTime();

    if (isDateRangeOverlap(new Date(newFrom).getTime(), new Date(newTo).getTime(), existingFrom, existingTo)) {
      return true; // Overlapping ranges found
    }
  }

  return false; // No overlapping ranges found
}
