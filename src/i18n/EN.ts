export const en = {
  common: {
    hi: "Hi",
    save: "Save",
    continue: "Continue",
    signOut: "Sign Out",
    signIn: "Sing In",
    ok: "OK",
    cancel: "Cancel",
    openSettings: "Open settings",
    confirm: "Confirm",
    done: "Done",
  },
  drawer: {
    Overview: "Báo cáo tổng hợp",
    Permission: "Quản lý phân quyền",
    Supplier: "Quản lý khách hàng/nhà cung cấp",
    Weighing: "Phiếu cân",
    Quality: "Quản lý chất lượng đầu vào",
    Weight: "Nhập độ cân",
    Payment: "Quản lý ứng tiền",
    SVRApproval: "Duyệt Ứng SVR10",
    Cashflow: "Nhập chi - tiền mặt",
    Cashier: "Thủ quỹ - Tiền mặt",
    Warehouse: "Quản lý kho",
    Order: "Đơn hàng",
    DocumentDiscount: "Báo cáo chiết khấu bộ chứng từ (USD)",
    Transfer: "Báo cáo tiền chuyển khoản",
  },
  image: {
    camera: "Camera",
    gallery: "Gallery",
    cameraError: {
      title: "Camera Access Denied",
      message:
        "The application is unable to access the camera. Please check your permission settings and try again.",
    },
  },
  biometric: {
    FaceID: {
      title: "Secure Your Account\nwith Face ID",
      message:
        "This is how we make sure that only you can\naccess your wallet.",
      enableBTN: "Enable Face ID",
    },
    TouchID: {
      title: "Secure Your Account\nwith Touch ID",
      message:
        "This is how we make sure that only you can\naccess your wallet.",
      enableBTN: "Enable Touch ID",
    },
    Biometrics: {
      title: "Secure Your Account\nwith Fingerprint Authentication",
      message:
        "This is how we make sure that only you can\naccess your wallet.",
      enableBTN: "Enable Fingerprint",
    },
    promtMessage: "Confirm your fingerprint",
    cancelButtonText: "Cancel",
  },
  input: {
    email: {
      label: "Email",
      placeholder: "Enter your email",
    },
    login: {
      label: "Tên đăng nhập",
      placeholder: "Nhập tên đăng nhập",
    },
    password: {
      label: "Password",
      placeholder: "Enter your password",
    },
    fullName: {
      label: "Full name",
      placeholder: "Enter your full name",
    },
  },
  errorMessage: {
    input: {
      compare: "{{input}} must match",
      required: "Please, make sure you fill in {{input}}.",
      incorrect: "Please, make sure you fill correct information.",
      invalid: "Invalid {{input}}.",
      mesExtensionOne: "Please upload only pdf, png, jpg, jpeg format",
      bankAccountNumber: "The account number must be between 10 and 15 digits.",
      email: "Please enter a valid email address",
      dob: "You must be at least 18 years old to use this app.",
      password: {
        uppercase: "Password must contain at least one uppercase letter.",
        lowercase: "Password must contain at least one lowercase letter.",
        number: "Password must contain at least one number.",
        mismatch: "Passwords do not match.",
      },
      incorrectEmail: "Vui lòng nhập đúng định dạng email",
      maxImage: "Vui lòng tải file nhỏ hơn hoặc bằng 5MB",
    },
    minLength: " the length must be larger than or equal to {{length}}",
    maxLength: " the length must be less than or equal to {{length}}",
  },
  language: {
    title: "Language",
  },
  signIn: {
    title: "Sign In",
    submitButton: "Sign In",
    forgot: "Forgot password?",
    noAccount: "Don't have account?",
    createAccount: "Create account",
    welcomeBack: "Welcome Back!",
    subTitle: "Login to continue",
    signUpNow: "Sign Up Now",
  },
  signOut: {
    modal: {
      title: "Sign Out",
      message: "Are you sure you want to sign out?",
    },
  },
  signUp: {
    title: "Sign Up",
    signUpNow: "Sign Up Now",
    terms: "I agree to the Term & Conditions and Privacy Policy",
    haveAccount: "Already have account?",
    signIn: "Sign in",
  },
  home: {
    title: "Home",
    currentAssignment: "Current Assigments",
  },
  summary: {
    academicSumary: "Academic Summary",
    attendanceOverview: "Attendance Overview",
    recentScore: "Recent Score",
    viewReport: "View report",
  },
  modal: {
    home: {
      confirmDoneTask: "Please confirm that this task has been completed!",
    },
  },
};

export type TTranslations = typeof en;
