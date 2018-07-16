import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Radio as radio } from './Layout';

const { Layout, Button } = radio;

@Component
export default class Radio extends Vue {
  @Prop({ type: Boolean, required: false, default: false })
  private readonly checked!: boolean;

  @Prop({ type: String, required: false })
  private readonly value!: string;

  @Prop({ type: String, required: false })
  private readonly name!: string; // eslint-disable-line no-restricted-globals

  private handleChange(e: any) {
    this.$emit('change', e.target.value);
  }

  render() {
    return (
      <Layout>
        <input
          type="radio"
          name={this.name}
          value={this.value}
          checked={this.checked}
          onChange={this.handleChange}
        />
        <Button />
        <span>{this.$slots.default}</span>
      </Layout>
    );
  }
}