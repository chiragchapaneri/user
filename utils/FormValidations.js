import * as Yup from "yup";
import moment from "moment";

export const LoginValidationSchema = Yup.object({
  email: Yup.string()

    .email("Invalid email address")
    .required("E-mail is Required"),
  password: Yup.string()
    .trim()
    .oneOf([Yup.ref("password"), null])
    .min(8, "Must be 8 char long")
    .required("Password is Required"),
});

export const RegisterValidationSchema = Yup.object({
  firstName: Yup.string()
    .trim()
    .min(3, "Must be 3 char long")
    .matches(/^\p{L}+$/u, "Special char not allowed")
    .required("First name is required"),
  lastName: Yup.string()
    .trim()
    .min(3, "Must be 3 char long")
    .matches(/^\p{L}+$/u, "Special char not allowed")
    .required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("E-mail is Required"),
  password: Yup.string()
    .trim()
    .oneOf([Yup.ref("password"), null])
    .min(8, "Must be 8 char long")
    .required("Password is Required"),
});

export const ResetValidationSchema = Yup.object({
  password: Yup.string()
    .trim()
    .oneOf([Yup.ref("password"), null])
    .min(8, "Must be 8 char long")
    .required("Password is Required"),
  cpassword: Yup.string()
    .trim()
    .oneOf([Yup.ref("cpassword"), null])
    .min(8, "Must be 8 char long")
    .required("Confirm Password is Required"),
});

export const ForgotValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("E-mail is Required"),
});

export const profilevalidation = Yup.object({
  firstName: Yup.string()
    .trim()
    .min(3, "Must be 3 char long")
    .required("First name is required"),
  lastName: Yup.string()
    .trim()
    .min(3, "Must be 3 char long")
    .required("Last name is required"),
});

export const locationvalidation = Yup.object({
  location: Yup.string()
    .trim()
    .min(5, "Must be 5 char long")
    .required(" location is required"),
});

export const changepassword = Yup.object({
  oldpassword: Yup.string()
    .trim()
    .min(8, "Must be 8 char long")
    .required(" Current password is required"),
  newpassword: Yup.string()
    .trim()
    .min(8, "Must be 8 char long")
    .required("New Password is required"),
  confirmpassword: Yup.string()
    .trim()
    .oneOf([Yup.ref("newpassword"), null], "Passwords must match")
    .min(8, "Must be 8 char long")
    .required(" Confirm Password is required"),
});

export const addressvalidation = Yup.object({
  state: Yup.string()
    .trim()
    .min(3, "must be 3 character long")
    .required("State is required"),
  addressline1: Yup.string()
    .trim()
    .min(10, "must be 10 character long")
    .required("Address Line 1 is required"),
  city: Yup.string()
    .trim()
    .min(3, "must be 3 character long")
    .required("City is required"),
  country: Yup.string()
    .min(4, "must be 4 character long")
    .required("Country is required"),
});
export const organizervalidation = Yup.object({
  organizername: Yup.string()
    .min(5, "Organizer Name must be 5 character long")
    .required("Organizer Name is required"),
  description: Yup.string()
    .min(5, "Description must be 5 character long")
    .required("Description is required"),
  events: Yup.string()
    .min(5, " Events Name must be 5 character long")
    .required("Events Name is required"),
});

export const personvalidation = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("E-mail is Required"),

  name: Yup.string()
    .min(2, "Must be 2 char long")
    .required("First name is required"),
});

export const CreateEventValidationSchema = {
  isVirtual: Yup.boolean(),
  name: Yup.string().required("Event title is required").trim(),
  address: Yup.string().when("isVirtual", {
    is: false,
    then: Yup.string().required("Address is required").trim(),
  }),
  city: Yup.string().when("isVirtual", {
    is: false,
    then: Yup.string().required("City is required").trim(),
  }),
  state: Yup.string().when("isVirtual", {
    is: false,
    then: Yup.string().required("State is required").trim(),
  }),
  country: Yup.string().when("isVirtual", {
    is: false,
    then: Yup.string().required("Country is required").trim(),
  }),
  postalCode: Yup.string().when("isVirtual", {
    is: false,
    then: Yup.string().required("Postal code is required").trim(),
  }),
  eventTypeId: Yup.string().required("Event type is Required"),
  tags: Yup.array()
    .min(1, "Please enter atleast 1 tag")
    .max(10, "You can add only 10 tags")
    .required("Event tag is Required")
    .nullable(),
  parentCategoryId: Yup.string().required("Event category is required"),
  categoryId: Yup.string().required("Sub category is required"),
  venueName: Yup.string().trim(),
  location: Yup.string()
    .when("isVirtual", {
      is: false,
      then: Yup.string().required("Please search your events location").trim(),
    })
    .when("isVirtual", {
      is: undefined,
      then: Yup.string().required("Please search your events location").trim(),
    }),
  shortDescription: Yup.string()
    .required("Short description is required")
    .trim(),
  startDate: Yup.string().required("Start date is required").nullable(),
  endDate: Yup.string()
    .required("End date is required")
    .test(
      "is-greater",
      "End date and time should be greater",
      function (value) {
        const { startDate } = this.parent;
        if (startDate && value) {
          return moment(value).isSameOrAfter(moment(startDate));
        }
        return true;
      }
    )
    .nullable(),
  startTime: Yup.string().required("Start time is required").nullable(),
  endTime: Yup.string().required("End time is required").nullable(),
  tickets: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required("Name is required").trim(),
        price: Yup.number().required("Price is required"),
        quantity: Yup.string()
          .required("Quantity is required")
          .matches(/^\d+$/, "Quantity in digits only"),
        endDate: Yup.string()
          .test(
            "is-greater",
            "End date and time should be greater",
            function (value) {
              const { startDate } = this.parent;
              if (startDate && value) {
                return moment(value).isSameOrAfter(moment(startDate));
              }
              return true;
            }
          )
          .nullable(),
        status: Yup.string().required("Status is required"),
      })
    )
    .min(1, "You need to create atleast one ticket for your events"),
  contactDetails: Yup.object({
    name: Yup.string().required("Organizer name is required").trim(),
    phone: Yup.string()
      .required("Organizer phone is required")
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "Organizer phone in digits only"
      )
      .min(8)
      .nullable()
      .trim(),
    email: Yup.string()
      .email("Invalid email address")
      .required("Organizer email is required"),
  }),
};

// export const editEventValidationSchema = {
//   isVirtual: Yup.boolean(),
//   address: Yup.string().when("isVirtual", {
//     is: false,
//     then: Yup.string().required("Address is required").trim(),
//   }),
//   city: Yup.string().when("isVirtual", {
//     is: false,
//     then: Yup.string().required("City is required").trim(),
//   }),
//   state: Yup.string().when("isVirtual", {
//     is: false,
//     then: Yup.string().required("State is required").trim(),
//   }),
//   country: Yup.string().when("isVirtual", {
//     is: false,
//     then: Yup.string().required("Country is required").trim(),
//   }),
//   postalCode: Yup.string().when("isVirtual", {
//     is: false,
//     then: Yup.string().required("Postal code is required").trim(),
//   }),
//   eventTypeId: Yup.string().required("Event type is Required"),
//   tags: Yup.array()
//     .min(1, "Please enter atleast 1 tag")
//     .max(10, "You can add only 10 tags")
//     .required("Event tag is Required")
//     .nullable(),
//   parentCategoryId: Yup.string().required("Event category is required"),
//   categoryId: Yup.string().required("Sub category is required"),
//   venueName: Yup.string().trim(),
//   location: Yup.string()
//     .when("isVirtual", {
//       is: false,
//       then: Yup.string().required("Please search your events location").trim(),
//     })
//     .when("isVirtual", {
//       is: undefined,
//       then: Yup.string().required("Please search your events location").trim(),
//     }),
//   shortDescription: Yup.string()
//     .required("Short description is required")
//     .trim(),
//   startDate: Yup.string().required("Start date is required").nullable(),
//   endDate: Yup.string()
//     .required("End date is required")
//     .test(
//       "is-greater",
//       "End date and time should be greater",
//       function (value) {
//         const { startDate } = this.parent;
//         if (startDate && value) {
//           return moment(value).isSameOrAfter(moment(startDate));
//         }
//         return true;
//       }
//     )
//     .nullable(),
//   startTime: Yup.string().required("Start time is required").nullable(),
//   endTime: Yup.string().required("End time is required").nullable(),
//   tickets: Yup.array()
//     .of(
//       Yup.object().shape({
//         name: Yup.string().required("Name is required").trim(),
//         price: Yup.number().required("Price is required"),
//         quantity: Yup.string()
//           .required("Quantity is required")
//           .matches(/^\d+$/, "Quantity in digits only"),
//         endDate: Yup.string()
//           .test(
//             "is-greater",
//             "End date and time should be greater",
//             function (value) {
//               const { startDate } = this.parent;
//               if (startDate && value) {
//                 return moment(value).isSameOrAfter(moment(startDate));
//               }
//               return true;
//             }
//           )
//           .nullable(),
//       })
//     )
//     .min(1, "You need to create atleast one ticket for your events"),
//   contactDetails: Yup.object({
//     name: Yup.string().required("Organizer name is required").trim(),
//     phone: Yup.string()
//       .required("Organizer phone is required")
//       .matches(
//         /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
//         "Organizer phone in digits only"
//       )
//       .min(8)
//       .nullable()
//       .trim(),
//     email: Yup.string()
//       .email("Invalid email address")
//       .required("Organizer email is required"),
//   }),
// };

export const onSaveValidationSchema = Yup.object({
  name: Yup.string().required("Event Title is Required"),
});

export const OrganizationFormValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("E-mail is Required"),
  userFirstName: Yup.string()
    .trim()
    .min(2, "Must be 2 char long")
    .max(20, "Maximum 20 char")
    .required("First name is required")
    .matches(/^\p{L}+$/u, "Special characters not allowed"),
  userLastName: Yup.string()
    .trim()
    .min(2, "Must be 2 char long")
    .max(20, "Maximum 20 char")
    .required("Last name is required")
    .matches(/^\p{L}+$/u, "Special characters not allowed"),
  phone: Yup.string()
    .min(10, "Must be 10 digits long")
    .required("Phone number is required")
    .matches(/^\d+$/, "allow digits only"),
  addLine1: Yup.string()
    .trim()
    .min(2, "Must be 2 char long")
    .max(50, "Maximum 20 char")
    .required("Address Line 1 is required"),
  areaCode: Yup.string()
    .trim()
    .min(2, "Must be 2 char long")
    .max(8, "Maximum 8 char")
    .required("AreaCode is required"),
  city: Yup.string()
    .required(" City is required")
    .max(20, "Maximum 20 char")
    .trim()
    .matches(/^\p{L}+$/u, "Special characters not allowed"),
  country: Yup.object().required("Country is required").nullable(),
  state: Yup.string()
    .required("State is required")
    .max(30, "Maximum 30 char")
    .trim()
    .matches(/^\p{L}+$/u, "Special characters not allowed"),
  name: Yup.string()
    .required(" Organizer name is required")
    .max(50, "Maximum 50 char")
    .trim()
    .matches(/^\p{L}+$/u, "Special characters not allowed"),
  picName: Yup.string()
    .required("Person incharge name is required")
    .max(20, "Maximum 20 char")
    .trim()
    .matches(/^\p{L}+$/u, "Special characters not allowed"),
  coRegNo: Yup.string()
    .required("Company register number is required")
    .max(20, "Maximum 20 char")
    .trim(),
  picContact: Yup.string()
    .min(10, "Must be 10 digits long")
    .required("Person incharge phone number is required")
    .matches(/^\d+$/, "allow digits only"),
  picEmail: Yup.string()
    .max(20, "Maximum 20 char")
    .required(" Person incharge email is required")
    .email("Invalid email address"),
  paymentTerms: Yup.object().required("Payment Terms is required").nullable(),
  commission: Yup.number()
    .required("Commission is required")
    .lessThan(101, "Commision should be less then 100%"),
});

export const editPublishedEventValidationSchema = {
  isVirtual: Yup.boolean(),
  eventTypeId: Yup.string().required("Event Type is Required").nullable(),
  tags: Yup.array()
    .min(1, "Please enter atleast 1 tag")
    .max(10, "You can add only 10 tags")
    .required("Event Tag is Required")
    .nullable(),
  parentCategoryId: Yup.string()
    .required("Event Category is Required")
    .nullable(),
  categoryId: Yup.string().required("Sub Category is Required").nullable(),
  venueName: Yup.string().trim(),
  shortDescription: Yup.string()
    .required("Short description is required")
    .trim(),
  contactDetails: Yup.object({
    name: Yup.string().required("Organizer name is required").trim(),
    phone: Yup.string()
      .required("Organizer phone is required")
      .matches(/^\d+$/, "Organizer phone in digits only")
      .min(8)
      .nullable()
      .trim(),
    email: Yup.string()
      .email("Invalid email address")
      .required("Organizer email is required"),
  }),
};

const ticketValidation = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Min 2 char required")
    .trim(),
  type: Yup.string(),
  price: Yup.number().when("type", {
    is: "PAID",
    then: Yup.number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .required("Price is required")
      .min(1, "Price should not be 0"),
  }),
  quantity: Yup.number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required("Quantity is required")
    .min(1, "Quantity should be atleast 1"),
  startDate: Yup.date().nullable().default(undefined),
  endDate: Yup.date()
    .nullable()
    .default(undefined)
    .test(
      "is-greater",
      "End date and time should be greater",
      function (value) {
        const { startDate } = this.parent;
        if (startDate && value) {
          return moment(value).isSameOrAfter(moment(startDate));
        }
        return true;
      }
    )
    .test("is-required", "End date and time is required", function (value) {
      const { startDate } = this.parent;
      if (startDate && !value) {
        return false;
      }
      return true;
    }),
  status: Yup.string().required("Status is required"),
});

export const createEventsFormValidation = Yup.object().shape({
  isVirtual: Yup.boolean(),
  name: Yup.string()
    .min(3, "Min 3 char required")
    .required("Name is required")
    .trim(),
  eventTypeId: Yup.string().required("Event type is required"),
  parentCategoryId: Yup.string().required("Category is required"),
  categoryId: Yup.string().required("Sub category is required"),
  tags: Yup.array()
    .required("Tags is required")
    .max(10, "You can add only 10 tags")
    .min(1, "Please enter atleast 1 tag"),
  searchLocation: Yup.string().when("isVirtual", {
    is: false,
    then: Yup.string().required("Please search your events location"),
  }),
  // .when("isVirtual", {
  //   is: undefined,
  //   then: Yup.string().required("Please search your events location"),
  // }),
  venueName: Yup.string().when("isVirtual", {
    is: false,
    then: Yup.string().required("Venue name is required").trim(),
  }),
  address: Yup.string().when("isVirtual", {
    is: false,
    then: Yup.string().required("Address is required").trim(),
  }),
  city: Yup.string().when("isVirtual", {
    is: false,
    then: Yup.string().required("City is required").trim(),
  }),
  state: Yup.string().when("isVirtual", {
    is: false,
    then: Yup.string().required("State is required").trim(),
  }),
  country: Yup.string().when("isVirtual", {
    is: false,
    then: Yup.string().required("Country is required").trim(),
  }),
  postalCode: Yup.string().when("isVirtual", {
    is: false,
    then: Yup.string().required("Postal Code is required").trim(),
  }),
  connectionDetails: Yup.string().when("isVirtual", {
    is: true,
    then: Yup.string().required("Link is required").trim(),
  }),
  startDate: Yup.date()
    .required("Start date and time is required")
    .nullable()
    .default(undefined),
  endDate: Yup.date()
    .required("End date and time is required")
    .nullable()
    .default(undefined)
    .test(
      "is-greater",
      "End date and time should be greater",
      function (value) {
        const { startDate } = this.parent;
        if (startDate && value) {
          return moment(value).isSameOrAfter(moment(startDate));
        }
        return true;
      }
    ),
  startTime: Yup.string()
    .required("Start date and time is required")
    .nullable(),
  endTime: Yup.string().required("End date and time is required").nullable(),
  contactDetails: Yup.object({
    name: Yup.string().required("Organizer name is required").trim(),
    phone: Yup.string()
      .required("Organizer phone is required")
      .matches(/^\d+$/, "Organizer phone in digits only")
      .min(8)
      .nullable()
      .trim(),
    email: Yup.string()
      .email("Invalid email address")
      .required("Organizer email is required"),
  }),
  tickets: Yup.array()
    .of(ticketValidation)
    .min(1, "Should add atleast 1 ticket"),

  shortDescription: Yup.string()
    .required("Short description is required")
    .trim(),
});

export const eventsSaveAsDraftValidation = Yup.object().shape({
  name: Yup.string().required("Name is required").trim(),
  organizerContactEmail: Yup.string().email("Please enter valid email"),
  tickets: Yup.array().of(ticketValidation),
  tags: Yup.array().max(10, "You can add only 10 tags"),
  parentCategoryId: Yup.string(),
  categoryId: Yup.string().when("parentCategoryId", (parentCategoryId) => {
    if (parentCategoryId)
      return Yup.string().required("Sub category is required");
  }),
  startDate: Yup.date().nullable().default(undefined),
  endDate: Yup.date()
    .nullable()
    .default(undefined)
    .when("startDate", (startDate) => {
      if (startDate)
        return Yup.date()
          .nullable()
          .default(undefined)
          .test(
            "is-greater",
            "End date and time should be greater",
            function (value) {
              const { startDate } = this.parent;
              if (value) {
                return moment(value).isSameOrAfter(moment(startDate));
              }
              return true;
            }
          );
    }),
});
