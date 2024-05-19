import * as yup from "yup";

const validationsForm = {
  payWay: yup.string().required("Поле обов\'язкове"),
  cardNumber: yup.string()
    .required('Поле обов\'язкове')
    .matches(/^[0-9]{16}$/, 'Некоректний ввід'),
  monthOfDate: yup.string().required("Поле обов\'язкове"),
  yearOfDate: yup.string().required("Поле обов\'язкове"),
  cvvCode: yup
    .string()
    .matches(/^[0-9]+$/, 'Повинно містити тільки цифри')
    .length(3, "Має бути 3 цифри").required("Поле обов\'язкове"),
  customerName: yup.string().required("Поле обов\'язкове"),
  customerSurname: yup.string().required("Поле обов\'язкове"),
  adress: yup.string().required("Поле обов\'язкове"),
  country: yup.string().required("Поле обов\'язкове"),
  city: yup.string().required("Поле обов\'язкове"),
  postIndex: yup.number().required("Поле обов\'язкове"),
  phone: yup
    .string()
    .matches(/^(\+?\d{1,4}?[\s-]?)?\(?\d{1,4}?\)?[\s-]?\d{1,4}[\s-]?\d{1,4}[\s-]?\d{1,9}$/, 'Некоректний номер телефону')
    .required("Поле обов\'язкове"),
};

export default validationsForm;