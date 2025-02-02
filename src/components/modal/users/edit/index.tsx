import { Modal } from "../..";
import { IUsers } from "../../../../interfaces";
import TextField from "../../../textfield";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  modalConfig: any;
  userInfo: IUsers;
  onConfirm: () => void;
  formData: IUsers;
  setFormData: React.Dispatch<React.SetStateAction<IUsers>>;
}

export default function EditUserModal({
  isOpen,
  closeModal,
  modalConfig,
  formData,
  setFormData,
  onConfirm,
}: Props) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      title={modalConfig.title}
      onConfirm={onConfirm}
    >
      <div className="flex flex-col gap-2 min-h-full">
        <TextField
          label="Name"
          placeholder="Enter name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <TextField
          label="Username"
          placeholder="Enter username"
          required
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
        <TextField
          label="Email"
          placeholder="Enter email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <div className="flex flex-col gap-2">
          <h1>Address</h1>
          <TextField
            label="Street"
            placeholder="Enter street"
            required
            value={formData.address.street}
            onChange={(e) =>
              setFormData({
                ...formData,
                address: { ...formData.address, street: e.target.value },
              })
            }
          />
          <TextField
            label="Suite"
            placeholder="Enter suite"
            required
            value={formData.address.suite}
            onChange={(e) =>
              setFormData({
                ...formData,
                address: { ...formData.address, suite: e.target.value },
              })
            }
          />
          <TextField
            label="City"
            placeholder="Enter city"
            required
            value={formData.address.city}
            onChange={(e) =>
              setFormData({
                ...formData,
                address: { ...formData.address, city: e.target.value },
              })
            }
          />
          <TextField
            label="Zipcode"
            placeholder="Enter zipcode"
            required
            value={formData.address.zipcode}
            onChange={(e) =>
              setFormData({
                ...formData,
                address: { ...formData.address, zipcode: e.target.value },
              })
            }
          />
          <div className="">
            <TextField
              label="Lat"
              placeholder="Enter lat"
              required
              value={formData.address.geo.lat}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: {
                    ...formData.address,
                    geo: { ...formData.address.geo, lat: e.target.value },
                  },
                })
              }
            />
            <TextField
              label="Lng"
              placeholder="Enter lng"
              required
              value={formData.address.geo.lng}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: {
                    ...formData.address,
                    geo: { ...formData.address.geo, lng: e.target.value },
                  },
                })
              }
            />
          </div>
          <TextField
            label="Phone"
            placeholder="Enter phone"
            required
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
          <TextField
            label="Website"
            placeholder="Enter website"
            required
            value={formData.website}
            onChange={(e) =>
              setFormData({ ...formData, website: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <h1>Company</h1>
          <TextField
            label="Name"
            placeholder="Enter name"
            required
            value={formData.company.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                company: { ...formData.company, name: e.target.value },
              })
            }
          />
          <TextField
            label="Catch Phrase"
            placeholder="Enter catch phrase"
            required
            value={formData.company.catchPhrase}
            onChange={(e) =>
              setFormData({
                ...formData,
                company: { ...formData.company, catchPhrase: e.target.value },
              })
            }
          />
          <TextField
            label="Bs"
            placeholder="Enter bs"
            required
            value={formData.company.bs}
            onChange={(e) =>
              setFormData({
                ...formData,
                company: { ...formData.company, bs: e.target.value },
              })
            }
          />
        </div>
      </div>
    </Modal>
  );
}
