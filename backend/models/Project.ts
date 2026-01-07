import mongoose, {Schema, Document} from 'mongoose';

// Interface untuk membantu TypeScript mengenali struktur data kita
export interface IProject extends Document {
  title: string;
  description: string;
  imageUrl: string;
  techStack: string[];
  link?: string;
}

const ProjectSchema: Schema = new Schema(
  {
    title: {type: String, required: true},
    description: {type: String, required: true},
    imageUrl: {type: String, required: true},
    techStack: {type: [String], required: true}, // Array of strings
    link: {type: String},
  },
  {timestamps: true}
); // Otomatis membuat createdAt dan updatedAt

export default mongoose.model<IProject>('Project', ProjectSchema);
