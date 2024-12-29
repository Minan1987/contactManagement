import * as yup from 'yup';
export const contactSchema = yup.object().shape({
    fullname: yup.string().required("نام و نام خانوادگی الزامی می باشد."),
    photo: yup.string().url("آدرس عکس معتبر نیست").required("عکس الزامی می باشد."),
    mobile: yup.number().required("شماره تلفن الزامی می باشد."),
    email: yup.string().email('فرمت ایمیل اشتباه است.').required("ایمیل الزامی است."),
    job: yup.string().nullable(),
    group: yup.string().required("لطفا گروه خود را انتخاب کنید.")
})