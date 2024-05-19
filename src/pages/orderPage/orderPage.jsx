import { useFormik, Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Typography, TextField, Button, Grid } from '@mui/material';

const OrderPage = () => {

  /*const validateCreditCard = (value) => {
    const regex = /^[0-9]{16}$/; 
    if (!regex.test(value)) {
      return false;
    }
  }

  const formik = useFormik({
    initialValues: {
      cardNumber: '',
      monthOfDate: '',
      yearOfDate: '',
      cvvCode: '',
      customerName: '',
      customerSurname: '',
      adress: '',
      country: '',
      city: '',
      postIndex: '',
      phone: ''
    },
    validationSchema: Yup.object({
      cardNumber: Yup.string().required('Поле обов\'язкове').matches(regex, 'Некоректний ввід'),
      productName: Yup.string().required('Поле обов\'язкове'),
      cvvCode: Yup.number().required('Поле обов\'язкове').min(1, 'Мінімум 1'),
    }),
    onSubmit: (values) => {
      console.log(values);
      
    },
  });*/

  return (
    

   <Formik
   initialValues={{payWay: 'Visa', cardNumber: '', monthOfDate: '', yearOfDate: '', cvvCode: '', customerName: '', customerSurname: '', adress: '', country: '', city: '', postIndex: '', phone: ''}}
      validationSchema={Yup.object({
        payWay: Yup.string().required('Поле обов\'язкове'),
        cardNumber: Yup.string().required('Поле обов\'язкове').matches(/^[0-9]{16}$/, 'Некоректний ввід'),  
        cvvCode: Yup.number().required('Поле обов\'язкове').min(3, 'Мінімум 3').max(3, 'Максимум 3'),
      })}
      onSubmit={(values, {resetForm}) => {
          
          //dispatch(actionUpdateCv(values))
          //navigate('/preview')
          //resetForm()
          //localStorage.clear('basket')
          //window.location.reload()
        }}
    >
   {({errors, touched}) => {
    return (    
    <Form>
      <Grid container spacing={2} direction="column" padding={'20px'}>
        <Grid container
         xs={12}
         gap={'10px'}
         //columns={{ sm: 1, md: 2 }}
         direction="column"
         justifyContent="flex-start"
         alignItems={{sm: 'center', md: 'flex-start'}}
         >
          <Grid item sx={{alignSelf: 'center', marginTop: '10px', marginBottom: '10px'}}><Typography sx={{textAlign: 'center'}}>Спосіб оплати</Typography></Grid>
          
          <Grid container 
           sm={12} md={6}
           //spacing={2}
           direction="row"
           justifyContent={{sm: 'center', md: 'flex-start'}}
           alignItems="flex-end">
            <TextField
              fullWidth
              id="payWay"
              name="payWay"
              label="Оберіть спосіб оплати"
              error={touched.customerName && Boolean(errors.customerName)}
              helperText={touched.customerName && errors.customerName}
            />

          </Grid>
          
          <Grid container
           //sm={12} md={6}
           gap="20px"
           direction={{sm: 'column', md: 'row'}}
           justifyContent={{sm: 'flex-start', md: 'space-between'}}
           //alignItems="flex-end"
           >
            <Grid container item sm={12} md={5}>
             <TextField
               fullWidth
               id="cardNumber"
               name="cardNumber"
               label="Номер карти"
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
               
               id="monthOfDate"
               name="monthOfDate"
               label="міс"
               error={touched.monthOfDate && Boolean(errors.monthOfDate)}
               helperText={touched.monthOfDate && errors.monthOfDate}
              />
            </Grid>
            <Grid item width={'100px'}>
              <TextField
               
               id="yearOfDate"
               name="yearOfDate"
               label="рік"
               error={touched.yearOfDate && Boolean(errors.yearOfDate)}
               helperText={touched.yearOfDate && errors.yearOfDate}
              />
            </Grid>
            <Grid item width={'100px'}>
              <TextField
               
               id="cvvCode"
               name="cvvCode"
               label="cvv-код"
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
                error={touched.adress && Boolean(errors.adress)}
                helperText={touched.adress && errors.adress}
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                id="country"
                name="country"
                label="Країна"
                error={touched.country && Boolean(errors.country)}
                helperText={touched.country && errors.country}
              />
            </Grid>


          </Grid>
          <Grid container sm={12} md={5} gap={'5px'}>
            <Grid item>
              <TextField
                fullWidth
                id="city"
                name="city"
                label="Місто"
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
    </Form>
    )
  }}

    </Formik>
  );
};

export default OrderPage;