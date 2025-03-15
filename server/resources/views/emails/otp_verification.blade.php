<!DOCTYPE html>
<html>
<head>
    <title>OTP Verification</title>
</head>
<body>
    <h2>Hello {{ $user->name }},</h2>
    <p>Your One-Time Password (OTP) for email verification is:</p>
    <h3 style="font-size: 24px; color: blue;">{{ $otp }}</h3>
    <p>This OTP is valid for 10 minutes. Do not share it with anyone.</p>
    <p>Thank you,</p>
    <p>Your Application Team</p>
</body>
</html>
