const express = require('express');
const app = express();
const port = 3000;

// Endpoint 1: Calculate total cart value
app.get('/cart-total', (req, res) => {
  const newItemPrice = parseFloat(req.query.newItemPrice);
  const cartTotal = parseFloat(req.query.cartTotal);

  if (isNaN(newItemPrice) || isNaN(cartTotal)) {
    return res.status(400).send("Invalid input. Please provide numeric values for newItemPrice and cartTotal.");
  }

  const total = newItemPrice + cartTotal;
  res.send(total.toString());
});

// Endpoint 2: Apply membership discount
app.get('/membership-discount', (req, res) => {
  const cartTotal = parseFloat(req.query.cartTotal);
  const isMember = req.query.isMember === 'true'; // Convert string to boolean

    if (isNaN(cartTotal)) {
        return res.status(400).send("Invalid input. Please provide numeric values for cartTotal.");
      }

  let finalPrice = cartTotal;
  if (isMember) {
    finalPrice *= 0.9; // 10% discount
  }
  res.send(finalPrice.toString());
});

// Endpoint 3: Calculate tax
app.get('/calculate-tax', (req, res) => {
  const cartTotal = parseFloat(req.query.cartTotal);

    if (isNaN(cartTotal)) {
        return res.status(400).send("Invalid input. Please provide numeric values for cartTotal.");
      }
      
  const tax = cartTotal * 0.05; // 5% tax
  res.send(tax.toString());
});

// Endpoint 4: Estimate delivery time
app.get('/estimate-delivery', (req, res) => {
  const shippingMethod = req.query.shippingMethod;
  const distance = parseFloat(req.query.distance);

    if (isNaN(distance)) {
        return res.status(400).send("Invalid input. Please provide numeric values for distance.");
      }

  let deliveryDays;
  if (shippingMethod === 'standard') {
    deliveryDays = Math.ceil(distance / 50);
  } else if (shippingMethod === 'express') {
    deliveryDays = Math.ceil(distance / 100);
  } else {
    return res.status(400).send("Invalid shipping method. Use 'standard' or 'express'.");
  }
  res.send(deliveryDays.toString());
});

// Endpoint 5: Calculate shipping cost
app.get('/shipping-cost', (req, res) => {
  const weight = parseFloat(req.query.weight);
  const distance = parseFloat(req.query.distance);

    if (isNaN(weight) || isNaN(distance)) {
        return res.status(400).send("Invalid input. Please provide numeric values for weight and distance.");
      }

  const shippingCost = weight * distance * 0.1;
  res.send(shippingCost.toString());
});

// Endpoint 6: Calculate loyalty points
app.get('/loyalty-points', (req, res) => {
  const purchaseAmount = parseFloat(req.query.purchaseAmount);
  
    if (isNaN(purchaseAmount)) {
        return res.status(400).send("Invalid input. Please provide numeric values for purchaseAmount.");
      }

  const loyaltyPoints = purchaseAmount * 2;
  res.send(loyaltyPoints.toString());
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});