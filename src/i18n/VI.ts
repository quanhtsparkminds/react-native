import { signIn } from "store";
import { TTranslations } from "./EN";

export const vi = {
  common: {
    hi: "Xin chào",
    save: "Lưu",
    continue: "Tiếp tục",
    signOut: "Đăng xuất",
    ok: "Đồng ý",
    cancel: "Hủy",
    openSettings: "",
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
      title: "Bảo vệ tài khoản của bạn\nvới Face ID",
      message:
        "Đây là cách chúng tôi đảm bảo rằng chỉ có bạn\nmới có thể truy cập vào ví của mình.",
      enableBTN: "Kích hoạt Face ID",
    },
    TouchID: {
      title: "Bảo vệ tài khoản của bạn\nvới Touch ID",
      message:
        "Đây là cách chúng tôi đảm bảo rằng chỉ có bạn\nmới có thể truy cập vào ví của mình.",
      enableBTN: "Kích hoạt Touch ID",
    },
    Biometrics: {
      title: "Bảo vệ tài khoản của bạn\nvới Xác thực Vân tay",
      message:
        "Đây là cách chúng tôi đảm bảo rằng chỉ có bạn\nmới có thể truy cập vào ví của mình.",
      enableBTN: "Kích hoạt Vân tay",
    },
    promtMessage: "Xác nhận vân tay của bạn",
    cancelButtonText: "Hủy",
  },
  input: {
    email: {
      label: "Email",
      placeholder: "Nhập email của bạn",
    },
    login: {
      label: "Tên đăng nhập",
      placeholder: "Nhập tên đăng nhập",
    },
    password: {
      label: "Mật khẩu",
      placeholder: "Nhập mật khẩu",
    },
    fullName: {
      label: "Tên",
      placeholder: "Nhập tên của bạn",
    },
  },
  errorMessage: {
    input: {
      compare: "{{input}} phải khớp",
      required: "Vui lòng nhập {{input}}.",
      incorrect: "Vui lòng đảm bảo bạn đã nhập thông tin chính xác.",
      invalid: "{{input}} không hợp lệ.",
      mesExtensionOne: "Vui lòng chỉ tải lên định dạng pdf, png, jpg, jpeg",
      bankAccountNumber: "Số tài khoản phải có từ 10 đến 15 chữ số.",
      email: "Vui lòng nhập địa chỉ email hợp lệ",
      dob: "Bạn phải ít nhất 18 tuổi để sử dụng ứng dụng này.",
      password: {
        uppercase: "Mật khẩu phải chứa ít nhất một chữ cái viết hoa.",
        lowercase: "Mật khẩu phải chứa ít nhất một chữ cái viết thường.",
        number: "Mật khẩu phải chứa ít nhất một chữ số.",
        mismatch: "Mật khẩu không khớp.",
      },
      incorrectEmail: "Vui lòng nhập đúng định dạng email",
      maxImage: "Vui lòng tải file nhỏ hơn hoặc bằng 5MB",
    },
    minLength: "Vui lòng nhập ít nhất {{length}} ký tự",
    maxLength: "Vui lòng không nhập quá {{length}} ký tự",
  },
  language: {
    title: "Ngôn ngữ",
  },
  signIn: {
    title: "Đăng nhập",
    submitButton: "Đăng nhập",
    forgot: "Quên mật khẩu?",
    noAccount: "Chưa có tài khoản?",
    createAccount: "Tạo tài khoản",
    welcomeBack: "Chào mừng trở lại",
    subTitle: "Đăng nhập để tiếp tục",
    signUpNow: "Đăng ký ngay",
  },
  signOut: {
    modal: {
      title: "Đăng xuất",
      message: "Bạn có chắc chắn muốn đăng xuất không?",
    },
  },
  signUp: {
    title: "Đăng ký",
    terms: "Tôi đồng ý với Điều khoản & Điều kiện và Chính sách Bảo mật",
    haveAccount: "Đã có tài khoản?",
    signIn: "Đăng nhập",
  },
  home: {
    title: "Trang chủ",
  },
};
