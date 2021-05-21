import moment from 'moment';

export const formatMonth = (date) => {
  return moment(new Date(date)).format("MM");
};

export const formatDay = (date) => {
  return moment(new Date(date)).format("ddd");
};

export const formatDateShort = (date) => {
  return moment(new Date(date)).format("M/d");
};

export const formatDate = (date) => {
  return moment(new Date(date)).format("M/d/yy");
};

export const formatDateTime = (date) => {
  return moment(new Date(date)).format("M/d/yy / hh:hh A");
};