import { useController } from "react-hook-form";
import { formatCardNumber } from "../utils/formatter";
import style from "../styles/Form.module.css";
import { useState } from "react";
import iconComplete from "../assets/image/icon-complete.svg";
import Card from "./Card";
export default function Form({
  handleSubmit,
  control,
  errors,
  register,
  reset,
  watch,
}) {
  const {
    field: cardNumberField,
    fieldState: { error: cardNumberError },
  } = useController({
    control,
    name: "number",
    rules: {
      required: "Can't be blank",
      minLength: {
        value: 19,
        message: "Incomplete card number",
      },
      pattern: {
        value: /^(?=.*\d)[\d ]+$/,
        message: "Wrong format, numbers only",
      },
    },
  });
  const [isComplete, setIsComplete] = useState(false);

  function onSubmit(data, event) {
    event.preventDefault();
    // Send data to backend 👇
    console.log(data);
    setIsComplete(true);
  }

  function handleContinue() {
    setIsComplete(false);
    reset();
  }

  if (isComplete)
    return (
      <div className={style.complete}>
        <img src={iconComplete} className={style.icon} />
        <h1 className={style.thankYou}>THANK YOU!</h1>
        <p className={style.msg}>We&apos;ve added your card details</p>
        <button onClick={handleContinue} className={style.continueBtn}>
          Continue
        </button>
      </div>
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.ccForm}>
        <label htmlFor="email">Email</label>
      <input
        id="email"
        {...register("email", { required: "Can't be blank" })}
        placeholder="e.g. Jane Appleseed"
      />
        <label htmlFor="phone">Phone</label>
      <input
        id="phone"
        {...register("phone", { required: "Can't be blank" })}
        placeholder="e.g. 010101010"
      />
      <Card cardData={watch()}/>
      <label htmlFor="cardholder-name">CARDHOLDER NAME</label>
      <input
        id="cardholder-name"
        {...register("cardholderName", { required: "Can't be blank" })}
        placeholder="e.g. Jane Appleseed"
      />
      {errors.cardholderName && (
        <p className={style.error}>{errors.cardholderName.message}</p>
      )}
      <label htmlFor="card-number">CARD NUMBER</label>
      <input
        id="card-number"
        onChange={(e) => {
          cardNumberField.onChange(formatCardNumber(e.target.value));
        }}
        onBlur={cardNumberField.onBlur}
        value={cardNumberField.value}
        ref={cardNumberField.ref}
        inputMode="numeric"
        placeholder="e.g. 1234 5678 9123 0000"
      />
      {cardNumberError && (
        <p className={style.error}>{cardNumberError.message}</p>
      )}
      <div className={style.bottomContainer}>
        <div className={style.expDate}>
          <label htmlFor="card-exp-month">EXP. DATE (MM/YY)</label>
          <div className={style.flex}>
            <input
              id="card-exp-month"
              {...register("expMonth", {
                min: { value: 1, message: "Invalid date" },
                max: { value: 12, message: "Invalid date" },
                required: "Can't be blank",
              })}
              maxLength={2}
              inputMode="numeric"
              placeholder="MM"
            />
            <input
              id="card-exp-year"
              {...register("expYear", {
                required: "Can't be blank",
                min: {
                  value: new Date().getFullYear() % 2000,
                  message: "Invalid date",
                },
                max: {
                  value: 99,
                  message: "Invalid date",
                },
              })}
              maxLength={2}
              inputMode="numeric"
              placeholder="YY"
            />
          </div>
          {(errors.expMonth && (
            <p className={style.error}>{errors.expMonth.message}</p>
          )) ||
            (errors.expYear && (
              <p className={style.error}>{errors.expYear.message}</p>
            ))}
        </div>
        <div className={style.cvc}>
          <label htmlFor="card-cvc">CVC</label>
          <input
            id="card-cvc"
            {...register("cvc", {
              pattern: {
                value: /[0-9]{3}/,
                message: "Must be 3 digits",
              },
              required: "Can't be blank",
            })}
            maxLength={3}
            inputMode="numeric"
            placeholder="e.g. 123"
          />
          {errors.cvc && <p className={style.error}>{errors.cvc.message}</p>}
        </div>
      </div>
      <button className={style.btn}>Confirm</button>
    </form>
  );
}
