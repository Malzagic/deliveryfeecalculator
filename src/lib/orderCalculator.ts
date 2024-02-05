type Input = {
  [key: string]: string;
};

export function calculateOrder(input: Input) {
  let { cardValue, distance, amount, date } = input;

  const parseCardValue = parseFloat(cardValue);
  const parseDistance = parseInt(distance);
  const parseAmount = parseInt(amount);

  // I have to think about to error handling ...its not done yet.
  if (isNaN(parseCardValue) || isNaN(parseDistance) || isNaN(parseAmount)) {
    throw new Error("Please input correct values..!");
  }

  const formData = deliveryFeeCalculator(
    parseCardValue,
    parseAmount,
    parseDistance,
    date
  );

  return formData;
}

const deliveryFeeCalculator = (
  cardValue: number,
  amount: number,
  distance: number,
  date: string
) => {
  // variables
  const baseDeliveryfee = 2;
  const additionalDeliveryFee = 1;
  const minCardValue = 10;
  const minDistance = 1000;
  const startedCardValue = cardValue;
  let surcharge = 0;
  let additionalFee = 0;
  let finalCardValue = 0;
  let extraSurcharge = 0;

  // check if card value is bigger then 200 and if not calculate additional surcharges and fee
  if (startedCardValue >= 200) {
    finalCardValue = startedCardValue;
    surcharge = 0;
    additionalFee = 0;
  } else {
    // check amount of items and card value to calculate additional surcharge
    if (amount > 1 && cardValue < minCardValue) {
      surcharge = minCardValue - cardValue;
    }

    // check distance
    if (distance >= minDistance || distance < minDistance)
      additionalFee += baseDeliveryfee;

    // calulcate distance after minus minimum distance and calculate additional fee
    let remainingDistance = Math.max(distance - minDistance, 0);
    if (remainingDistance > 0 || startedCardValue < 200)
      additionalFee +=
        Math.ceil(remainingDistance / 500) * additionalDeliveryFee;

    // check if its friday rush and multiply fee
    const finalFee = timeCheckHandler(date, additionalFee);

    if (finalFee.date) {
      additionalFee = finalFee.result;
    }

    // additional fee cannot be more than 15
    if (additionalFee > 15) additionalFee = 15;
  }

  // extra funcition to calculate extra surcharge base on amount of items
  extraSurcharge = extraSurchargeCalculator(amount);

  // final calulation
  finalCardValue =
    startedCardValue + surcharge + additionalFee + extraSurcharge;

  // parse value
  const finalSurcharge = surcharge.toString();
  const finalAdditionalFee = additionalFee.toFixed(2).toString();
  const finalExtraSurcharge = extraSurcharge.toString();
  const deliveryPrice = finalCardValue.toFixed(2).toString();

  const formData = {
    surcharge: finalSurcharge,
    deliveryFee: finalAdditionalFee,
    extraSurcharge: finalExtraSurcharge,
    totalPrice: deliveryPrice,
  };
  // returned result
  return formData;
};

const extraSurchargeCalculator = (amount: number) => {
  // variables added
  const noSurchargeCount = 4;
  const additionalSurchargeCount = 12;
  const surcharge = 0.5;
  const additionalSurcharge = 1.2;
  let surchargeCounts = 0;
  let extraFee;

  // check numbers of amount items
  if (amount > noSurchargeCount)
    surchargeCounts = Math.max(amount - noSurchargeCount);

  extraFee = surchargeCounts * surcharge;

  // check if some additional surcharges are needed
  if (amount > additionalSurchargeCount) extraFee += additionalSurcharge;

  // returned result
  return extraFee;
};

const timeCheckHandler = (date: string, additionalFee: number) => {
  // variables
  const multiplyFee = 1.2;
  // today date
  const currentUTCTime = new Date().toUTCString();
  const currentTime = currentUTCTime.split(" ").slice(4, 5).toString();
  const currentHour = +currentTime.split(":").slice(0, 1);
  const currentDay = currentUTCTime.split(",").slice(0, 1).toString();

  let result;
  let isDate = false;

  if (currentDay === "Fri" && (currentHour > 15 || currentHour < 19)) {
    isDate = true;
    result = additionalFee * multiplyFee;
  } else {
    isDate = false;
    result = additionalFee;
  }
  return { result, date: isDate };
};
