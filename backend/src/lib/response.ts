export const success = (res: any, data: any, message = "Success") => {
  res.status(200).json({ success: true, message, data });
};

export const error = (res: any, message = "Error", code = 500) => {
  res.status(code).json({ success: false, message });
};
