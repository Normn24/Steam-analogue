import { useFormik, Formik, Form, Field, ErrorMessage, withFormik } from 'formik';
import * as yup from 'yup';
import { Typography, TextField, Button, Grid, MenuItem } from '@mui/material';
import validationsForm from './validations/validationSchema';

const form = props => {
  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset
  } = props;

  const paySystem = [{value: "Visa", label: "Visa"}, {value: "Mastercard", label: "Mastercard"}];

  const getYears = (startYear) => {
    const currentYear = new Date().getFullYear();
    let years = [];
    for (let year = startYear; year <= currentYear; year++) {
      years.push({value: year, label: year});
    }
    return years;
  };

  const years = getYears(1980);

  const getMonth = () => {
    let months = [];
    for (let month = 1; month <= 12; month++) {
      months.push({value: month, label: (month < 10 ? `0${month}` : `${month}`)})
    }
    return months;
  }

  const months = getMonth();

  const countries = [{value: "Україна", label: "Україна"}, {value: "США", label: "США"}, {value: "Польша", label: "Польша"}];



  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} direction="column" padding={'20px'}>
        <Grid container
         xs={12}
         gap={'10px'}
         direction="column"
         justifyContent="flex-start"
         alignItems={{sm: 'center', md: 'flex-start'}}
         >
          <Grid item sx={{alignSelf: 'center', marginTop: '10px', marginBottom: '10px'}}><Typography sx={{textAlign: 'center'}}>Спосіб оплати</Typography></Grid>
          
          <Grid container 
           sm={12} md={6}
           direction="row"
           justifyContent={{sm: 'center', md: 'flex-start'}}
           alignItems="flex-end">
            <TextField
              select
              fullWidth
              id="payWay"
              name="payWay"
              label="Оберіть спосіб оплати"
              value={values.payWay}
              onChange={handleChange("payWay")}
              onBlur={handleBlur}
              error={touched.customerName && Boolean(errors.customerName)}
              helperText={touched.customerName && errors.customerName}
            >
            {paySystem.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

          </Grid>
          
          <Grid container
           gap="20px"
           direction={{sm: 'column', md: 'row'}}
           justifyContent={{sm: 'flex-start', md: 'space-between'}}
           >
            <Grid container item sm={12} md={5}>
             <TextField
               fullWidth
               id="cardNumber"
               name="cardNumber"
               label="Номер карти"
               placeholder='XXXX XXXX XXXX XXXX'
               value={values.cardNumber}
               onChange={handleChange}
               onBlur={handleBlur}
               error={touched.cardNumber && Boolean(errors.cardNumber)}
               helperText={touched.cardNumber && errors.cardNumber}
             />
            </Grid>
           
           <Grid container md={5}
             direction="row"
             justifyContent="flex-start"
             alignItems="flex-end"
             gap="10px">
            <Grid item width={'100px'}>
              <TextField
               select
               id="monthOfDate"
               name="monthOfDate"
               label="міс"
               value={values.monthOfDate}
               onChange={handleChange("monthOfDate")}
               onBlur={handleBlur}
               error={touched.monthOfDate && Boolean(errors.monthOfDate)}
               helperText={touched.monthOfDate && errors.monthOfDate}
              >
                {months.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item width={'100px'}>
              <TextField
               select
               id="yearOfDate"
               name="yearOfDate"
               label="рік"
               value={values.yearOfDate}
               onChange={handleChange("yearOfDate")}
               onBlur={handleBlur}
               error={touched.yearOfDate && Boolean(errors.yearOfDate)}
               helperText={touched.yearOfDate && errors.yearOfDate}
              >
                {years.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item width={'100px'}>
              <TextField
               id="cvvCode"
               name="cvvCode"
               label="cvv-код"
               placeholder='XXX'
               value={values.cvvCode}
               onChange={handleChange}
               onBlur={handleBlur}
               error={touched.cvvCode && Boolean(errors.cvvCode)}
               helperText={touched.cvvCode && errors.cvvCode}
              />  
            </Grid>
          </Grid>
         </Grid>
        </Grid>
        <Typography sx={{textAlign: 'center', marginTop: '15px', marginBottom: '15px'}}>Дані замовлення</Typography>
        <Grid container xs={12}
          direction={{sm: 'column', md: 'row'}}
          justifyContent={{sm: 'flex-start', md: 'space-between'}}
          gap={'10px'}
          >
          <Grid container sm={12} md={5} gap={'5px'}>
            <Grid container
            direction="row"
            justifyContent="flex-start"
            gap={'4px'}
            >
             <Grid item
             width={'calc(50% - 2px)'}>
              <TextField
                fullWidth
                id="customerName"
                name="customerName"
                label="Ім’я"
                value={values.customerName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.customerName && Boolean(errors.customerName)}
                helperText={touched.customerName && errors.customerName}
              />
             </Grid>
             <Grid item
             width={'calc(50% - 2px)'}>
              <TextField
                fullWidth
                id="customerSurname"
                name="customerSurname"
                label="Прізвище"
                value={values.customerSurname}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.customerSurname && Boolean(errors.customerSurname)}
                helperText={touched.customerSurname && errors.customerSurname}
              />
             </Grid>

            </Grid>
            <Grid item>
              <TextField
                fullWidth
                id="adress"
                name="adress"
                label="Адреса"
                value={values.adress}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.adress && Boolean(errors.adress)}
                helperText={touched.adress && errors.adress}
              />
            </Grid>
            <Grid item>
              <TextField
                select
                fullWidth
                id="country"
                name="country"
                label="Країна"
                value={values.country}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.country && Boolean(errors.country)}
                helperText={touched.country && errors.country}
              >
                {countries.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <Grid container sm={12} md={5} gap={'5px'}>
            <Grid item>
              <TextField
                fullWidth
                id="city"
                name="city"
                label="Місто"
                value={values.city}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.city && Boolean(errors.city)}
                helperText={touched.city && errors.city}
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                id="postIndex"
                name="postIndex"
                label="Поштовий індекс"
                value={values.postIndex}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.postIndex && Boolean(errors.postIndex)}
                helperText={touched.postIndex && errors.postIndex}
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                id="phone"
                name="phone"
                label="Телефон"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.phone && Boolean(errors.phone)}
                helperText={touched.phone && errors.phone}
              />
            </Grid>
          </Grid>  
        </Grid>
        <Grid item xs={12} sm={6}> 
        </Grid>
        <Grid container xs={12}
        direction={'row'}
        justifyContent={'flex-end'}>
          <Button type="submit" variant="contained" color="primary">
            Замовити
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

const OrderPage = withFormik({
  mapPropsToValues: ({
    payWay,
    cardNumber, 
    monthOfDate,
    yearOfDate,
    cvvCode,
    customerName,
    customerSurname,
    adress,
    country,
    city,
    postIndex,
    phone 
  }) => {
    return {
      payWay: payWay || "Visa",
      cardNumber: cardNumber || "",
      monthOfDate: monthOfDate || "",
      yearOfDate: yearOfDate || "",
      cvvCode: cvvCode || "",
      customerName: customerName || "",
      customerSurname: customerSurname || "",
      adress: adress || "",
      country: country || "",
      city: city || "",
      postIndex: postIndex || "",
      phone: phone || "",
    };
  },

  validationSchema: yup.object().shape(validationsForm),

  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      // submit to the server
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  }
})(form);

export default OrderPage;