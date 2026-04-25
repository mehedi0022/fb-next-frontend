import { SELLER_INFO } from "@/lib/home";

export default function ProfilePage() {
  return (
    <div className="page-inner">
      <div className="profile-card">
        <div className="profile-avatar">
          {SELLER_INFO.memberName.charAt(0)}
        </div>
        <h2 className="profile-name">{SELLER_INFO.memberName}</h2>
        <p className="profile-since">Member since {SELLER_INFO.memberSince}</p>

        <div className="profile-fields">
          {[
            ["Seller Code", SELLER_INFO.sellerCode],
            ["Email", SELLER_INFO.email],
            ["Phone", SELLER_INFO.phone],
            ["Domain", SELLER_INFO.domain],
          ].map(([label, value]) => (
            <div key={label} className="profile-field">
              <span className="profile-field__label">{label}</span>
              <span className="profile-field__value">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
