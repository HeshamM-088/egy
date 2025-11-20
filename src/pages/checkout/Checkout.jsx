import React, { useState, useMemo, useEffect } from "react";
import {
  Container, Grid, Card, Typography, TextField, Button,
  Checkbox, FormControlLabel, Box, Divider, RadioGroup, Radio,
} from "@mui/material";
import { useLocation } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();
  const [booking, setBooking] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [payment, setPayment] = useState("card");
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    const place = location.state?.card || location.state || {};

    setBooking({
      title: place.title ,
      content1: place.content1 ,
      img: place.img ,
      date: place.date ,
      time: place.time ,
      location: place.location ,
      price: parseFloat(place.price) || 45,
      serviceFee: parseFloat(place.serviceFee) || 5,
    });
  }, [location.state]);

  const total = useMemo(() => {
    if (!booking) return 0;
    return booking.price * quantity + booking.serviceFee;
  }, [quantity, booking]);

  const CardStyle = { p: 4, mb: 3, borderRadius: 3, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" };
  const TxtFieldStyle = {
    "& .MuiFilledInput-root": { backgroundColor: "#f6f6f6", borderRadius: 2 },
    "& .MuiFilledInput-underline:before": { borderBottom: "none" },
    "& .MuiFilledInput-underline:after": { borderBottom: "2px solid #000" },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreed) return alert("Please agree to the terms first.");
    alert("✅ Booking confirmed! Thank you for your purchase.");
  };

  const InfoField = ({ label, name, ...props }) => (
    <TextField
      fullWidth
      label={label}
      value={form[name]}
      onChange={(e) => setForm({ ...form, [name]: e.target.value })}
      variant="filled"
      sx={TxtFieldStyle}
      {...props}
    />
  );

  if (!booking) return null;

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h5" fontWeight="bold" mb={1}>
        Complete Your Booking
      </Typography>
      <Typography color="text.secondary" mb={3}>
        Secure your spot at this amazing destination
      </Typography>

      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: "flex-start", gap: 4 }}>
        <Box sx={{ flex: 1 }}>
          <Box component="form" onSubmit={handleSubmit}>
            <Card sx={{ ...CardStyle, display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2 }}>
              <Box
                component="img"
                src={booking.img}
                alt={booking.title}
                onError={(e) => (e.target.src = "https://placehold.co/150x120/E0E0E0/333?text=No+Image")}
                sx={{ width: { xs: "100%", sm: 140 }, height: { xs: 160, sm: 110 }, objectFit: "cover", borderRadius: 2 }}
              />
              <Box>
                <Typography variant="h6" fontWeight="bold">{booking.title}</Typography>
                <Typography color="text.secondary" sx={{ mt: 1 }}>{booking.content1}</Typography>
                <Typography color="text.secondary" sx={{ mt: 1 }}>📍 {booking.location}</Typography>
              </Box>
            </Card>

            <Card sx={CardStyle}>
              <Typography variant="h6" fontWeight="bold" mb={2}>Select Tickets</Typography>
              <Divider sx={{ mb: 3 }} />
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
                <Typography>General Admission — ${booking.price.toFixed(2)} per ticket</Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Button onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}>-</Button>
                  <Typography sx={{ mx: 2 }}>{quantity}</Typography>
                  <Button onClick={() => setQuantity((prev) => prev + 1)}>+</Button>
                </Box>
              </Box>
            </Card>

            <Card sx={CardStyle}>
              <Typography variant="h6" fontWeight="bold" mb={2}>Contact Information</Typography>
              <Divider sx={{ mb: 3 }} />
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}><InfoField label="Full Name" name="name" /></Grid>
                <Grid item xs={12} sm={6}><InfoField label="Email" name="email" /></Grid>
                <Grid item xs={12}><InfoField label="Phone Number" name="phone" /></Grid>
              </Grid>
            </Card>

            <Card sx={CardStyle}>
              <Typography variant="h6" fontWeight="bold" mb={2}>Payment Method</Typography>
              <Divider sx={{ mb: 3 }} />
              <RadioGroup value={payment} onChange={(e) => setPayment(e.target.value)} row>
                <FormControlLabel value="card" control={<Radio />} label="Credit Card" />
                <FormControlLabel value="wallet" control={<Radio />} label="Digital Wallet" />
              </RadioGroup>

              {payment === "card" && (
                <Grid container spacing={3} mt={1}>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Cardholder Name" variant="filled" sx={TxtFieldStyle} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Card Number" placeholder="1234 5678 9012 3456" variant="filled" sx={TxtFieldStyle} />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField fullWidth label="Expiry Date" placeholder="MM/YY" variant="filled" sx={TxtFieldStyle} />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField fullWidth label="CVV" placeholder="123" variant="filled" sx={TxtFieldStyle} />
                  </Grid>
                </Grid>
              )}
            </Card>

            <FormControlLabel
              control={<Checkbox checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />}
              label="I agree to the terms and conditions"
              sx={{ mb: 3 }}
            />
            <Button
              variant="contained"
              fullWidth
              type="submit"
              sx={{ bgcolor: "#000", color: "#fff", py: 1.5, borderRadius: 2, fontWeight: "bold", "&:hover": { bgcolor: "#333" } }}
            >
              Confirm Booking
            </Button>
          </Box>
        </Box>

        <Box sx={{ width: { xs: "100%", md: 350 }, flexShrink: 0, position: "sticky", top: 20, alignSelf: "flex-start" }}>
          <Card sx={CardStyle}>
            <Typography variant="h6" fontWeight="bold" mb={2}>Order Summary</Typography>
            <Typography variant="subtitle1" fontWeight="bold">{booking.title}</Typography>
            <Typography color="text.secondary" fontSize={14}>{booking.date}, {booking.time}</Typography>
            <Typography color="text.secondary" fontSize={14} mb={2}>{booking.location}</Typography>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.5 }}>
              <Typography color="text.secondary">Tickets ({quantity} × ${booking.price.toFixed(2)})</Typography>
              <Typography fontWeight="medium">${(booking.price * quantity).toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.5 }}>
              <Typography color="text.secondary">Service Fee</Typography>
              <Typography fontWeight="medium">${booking.serviceFee.toFixed(2)}</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography fontWeight="bold" variant="h6">Total</Typography>
              <Typography fontWeight="bold" variant="h6">${total.toFixed(2)}</Typography>
            </Box>
          </Card>
        </Box>
      </Box>
    </Container>
  );
};
export default Checkout;
