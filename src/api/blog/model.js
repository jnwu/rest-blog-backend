import mongoose, { Schema } from 'mongoose'

const blogSchema = new Schema({
  user: {
    type: String
  },
  entry: {
    type: String
  },
  createdAt: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

blogSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user,
      entry: this.entry,
      createdAt: this.createdAt,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Blog', blogSchema)

export const schema = model.schema
export default model
