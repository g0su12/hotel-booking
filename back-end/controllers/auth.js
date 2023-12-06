import User from "../models/user";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  console.log(req.body);
  const { name, email, password, phoneNumber } = req.body;
  const phoneNumberRegex = /^(0[0-9]{9})$/;
  if (!name) return res.status(400).send("Vui lòng nhập tên của nguời dùng");
  if (!password || password.length < 6)
    return res
      .status(400)
      .send("Vui lòng nhập mật khẩu có độ dài tối thiểu 6 ký tự");
  if (!phoneNumberRegex.test(phoneNumber))
    return res
      .status(400)
      .send("Số điện thoại không đúng");
  let userExist = await User.findOne({ email }).exec();
  if (userExist) return res.status(400).send("Địa chỉ email đã tồn tại");
  const user = new User(req.body);
  try {
    await user.save();
    return res.json({ ok: true });
  } catch (err) {
    return res.status(400).send("Đã xảy ra lỗi, vui lòng thử lại");
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email }).exec();
    if (!user) {
      return res.status(400).send("Không tìm thấy địa chỉ email đã nhập");
    }
    user.comparePassword(password, (err, match) => {
      if (!match || err) return res.status(400).send("Thông tin đăng nhập không chính xác");
      let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "3d",
      });
      res.json({
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          stripe_account_id: user.stripe_account_id,
          stripe_seller: user.stripe_seller,
          stripeSession: user.stripeSession,
        },
      });
    });
  } catch (error) {
    res.status(400).send("Đăng nhập thất bại");
  }
};
