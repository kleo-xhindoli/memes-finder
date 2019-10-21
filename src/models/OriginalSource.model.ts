import { Schema } from 'mongoose';

const OriginalSourceSchema: Schema = new Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
});

export default OriginalSourceSchema;
