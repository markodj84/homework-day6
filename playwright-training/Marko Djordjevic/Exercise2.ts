function classifyResponse(status: number): string {
 
  if (!(typeof status === "number") || status < 0) {
    throw new Error("Status must be a non-negative number");
  }
   console.log("Status:", status);

  let message: string;

  switch (status) {
    case 200:
    case 201:
      message = "Success";
      break;
    default:
      if (status >= 400 && status <= 499) {
        message = "Client Error";
      } else if (status >= 500) {
        message = "Server Error";
      } else {
        message = "Unknown";
      }
  }

  console.log("Message:", message);
  return message;
}

classifyResponse(200);