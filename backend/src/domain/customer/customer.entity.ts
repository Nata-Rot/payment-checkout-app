export interface CustomerProps {
  id: string; email: string; fullName: string; phone: string; createdAt: Date;
}
export class Customer {
  readonly id: string; readonly email: string;
  readonly fullName: string; readonly phone: string; readonly createdAt: Date;
  constructor(props: CustomerProps) {
    this.id = props.id; this.email = props.email;
    this.fullName = props.fullName; this.phone = props.phone; this.createdAt = props.createdAt;
  }
  toProps(): CustomerProps {
    return { id: this.id, email: this.email, fullName: this.fullName, phone: this.phone, createdAt: this.createdAt };
  }
}
