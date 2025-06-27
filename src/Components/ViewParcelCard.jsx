import {
  FiPackage,
  FiUser,
  FiPhone,
  FiDollarSign,
  FiCheckCircle,
  FiXCircle,
  FiFileText,
  FiTruck,
  FiMapPin,
  FiClipboard,
} from "react-icons/fi";

function ViewParcelCard({ parcel }) {
  return (
    <div className="p-6 my5 bg-white rounded-xl shadow-md max-w-xl mx-auto min-h-[50vh]">
      <h2 className="text-2xl font-bold mb-6 text-[#CAEB66] flex items-center gap-2">
        <FiPackage /> Parcel Details
      </h2>

      <div className="space-y-4 text-gray-700">
        <p>
          <strong className="text-[#CAEB66] flex items-center gap-1">
            <FiFileText /> Title:
          </strong>{" "}
          {parcel.title}
        </p>

        <p>
          <strong className="text-[#CAEB66] flex items-center gap-1">
            <FiClipboard /> Type:
          </strong>{" "}
          {parcel.type}
        </p>

        {parcel.weight && (
          <p>
            <strong className="text-[#CAEB66] flex items-center gap-1">
              <FiTruck /> Weight:
            </strong>{" "}
            {parcel.weight} kg
          </p>
        )}

        <p>
          <strong className="text-[#CAEB66] flex items-center gap-1">
            <FiUser /> Sender:
          </strong>{" "}
          {parcel.senderName} ({parcel.senderContact})<br />
          📍 {parcel.senderDistrict}, {parcel.senderCenter}
        </p>

        <p>
          <strong className="text-[#CAEB66] flex items-center gap-1">
            <FiMapPin /> Sender Address:
          </strong>{" "}
          {parcel.senderAddress}
        </p>

        <p>
          <strong className="text-[#CAEB66]">Pickup Instruction:</strong>{" "}
          {parcel.pickupInstruction}
        </p>

        <p>
          <strong className="text-[#CAEB66] flex items-center gap-1">
            <FiUser /> Receiver:
          </strong>{" "}
          {parcel.receiverName} ({parcel.receiverContact})<br />
          📍 {parcel.receiverDistrict}, {parcel.receiverCenter}
        </p>

        <p>
          <strong className="text-[#CAEB66] flex items-center gap-1">
            <FiMapPin /> Receiver Address:
          </strong>{" "}
          {parcel.receiverAddress}
        </p>

        <p>
          <strong className="text-[#CAEB66]">Delivery Instruction:</strong>{" "}
          {parcel.deliveryInstruction}
        </p>

        <p>
          <strong className="text-[#CAEB66] flex items-center gap-1">
            <FiDollarSign /> Cost:
          </strong>{" "}
          {parcel.cost} ৳
        </p>

        <p className="flex items-center gap-2">
          <strong className="text-[#CAEB66]">Payment:</strong>
          <span
            className={`flex items-center gap-1 font-semibold ${
              parcel.paymentStatus === "paid"
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {parcel.paymentStatus === "paid" ? (
              <>
                <FiCheckCircle /> Paid
              </>
            ) : (
              <>
                <FiXCircle /> Unpaid
              </>
            )}
          </span>
        </p>

        <p>
          <strong className="text-[#CAEB66]">Status:</strong> {parcel.status}
        </p>

        <p>
          <strong className="text-[#CAEB66]">Created:</strong>{" "}
          {new Date(parcel.creation_date).toLocaleDateString("en-GB", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
    </div>
  );
}

export default ViewParcelCard;
