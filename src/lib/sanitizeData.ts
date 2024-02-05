type FormData = {
  [key: string]: string;
};

export function sanitizeData(formData: FormData) {
  const sanitizedFormData: FormData = {} as FormData;

  for(const key in formData) {
    if(Object.prototype.hasOwnProperty.call(formData, key)){
      sanitizedFormData[key] = sanitizator(formData[key]);
    }
  }
  
  return sanitizedFormData;
}

const sanitizator = (input: string) => {
  return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
};
