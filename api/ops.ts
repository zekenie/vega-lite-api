type Ops<T = string> = { [op: string]: T[] };

export const aggregateOps: Ops = {
  count: ["count"],
  valid: ["valid", "field"],
  missing: ["missing", "field"],
  distinct: ["distinct", "field"],
  sum: ["sum", "field"],
  mean: ["mean", "field"],
  product: ["product", "field"],
  average: ["average", "field"],
  variance: ["variance", "field"],
  variancep: ["variancep", "field"],
  stdev: ["stdev", "field"],
  stdevp: ["stdevp", "field"],
  stderr: ["stderr", "field"],
  median: ["median", "field"],
  q1: ["q1", "field"],
  q3: ["q3", "field"],
  ci0: ["ci0", "field"],
  ci1: ["ci1", "field"],
  min: ["min", "field"],
  max: ["max", "field"],
  argmin: ["argmin", "field"],
  argmax: ["argmax", "field"],
};

export const windowOps: Ops = {
  row_number: ["row_number"],
  rank: ["rank"],
  dense_rank: ["dense_rank"],
  percent_rank: ["percent_rank"],
  cume_dist: ["cume_dist"],
  ntile: ["ntile", "param"],
  lag: ["lag", "field", "param"],
  lead: ["lead", "field", "param"],
  first_value: ["first_value", "field"],
  last_value: ["last_Value", "field"],
  nth_value: ["nth_value", "field", "param"],
};

export const timeUnitOps: Ops = {
  // local time
  year: ["year"],
  quarter: ["quarter"],
  month: ["month"],
  day: ["day"],
  date: ["date"],
  hours: ["hours"],
  minutes: ["minutes"],
  seconds: ["seconds"],
  milliseconds: ["milliseconds"],
  yearmonth: ["yearmonth"],
  timeYQ: ["yearquarter"],
  timeYQM: ["yearquartermonth"],
  timeYM: ["yearmonth"],
  timeYMD: ["yearmonthdate"],
  timeYMDH: ["yearmonthdatehours"],
  timeYMDHM: ["yearmonthdatehoursminutes"],
  timeYMDHMS: ["yearmonthdatehoursminutesseconds"],
  timeQM: ["quartermonth"],
  timeMD: ["monthdate"],
  timeMDH: ["monthdatehours"],
  timeHM: ["hoursminutes"],
  timeHMS: ["hoursminutesseconds"],
  timeMS: ["minutesseconds"],
  timeSMS: ["secondsmilliseconds"],

  // utc time
  utcyear: ["utcyear"],
  utcquarter: ["utcquarter"],
  utcmonth: ["utcmonth"],
  utcday: ["utcday"],
  utcdate: ["utcdate"],
  utchours: ["utchours"],
  utcminutes: ["utcminutes"],
  utcseconds: ["utcseconds"],
  utcmilliseconds: ["utcmilliseconds"],
  utcyearmonth: ["utcyearmonth"],
  utcYQ: ["utcyearquarter"],
  utcYQM: ["utcyearquartermonth"],
  utcYM: ["utcyearmonth"],
  utcYMD: ["utcyearmonthdate"],
  utcYMDH: ["utcyearmonthdatehours"],
  utcYMDHM: ["utcyearmonthdatehoursminutes"],
  utcYMDHMS: ["utcyearmonthdatehoursminutesseconds"],
  utcQM: ["utcquartermonth"],
  utcMD: ["utcmonthdate"],
  utcMDH: ["utcmonthdatehours"],
  utcHM: ["utchoursminutes"],
  utcHMS: ["utchoursminutesseconds"],
  utcMS: ["utcminutesseconds"],
  utcSMS: ["utcsecondsmilliseconds"],
};
