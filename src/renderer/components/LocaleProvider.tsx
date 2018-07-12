import fs from 'fs';
import path from 'path';

import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Provide, Watch } from 'vue-property-decorator';

@Component
export default class LocaleProvider extends Vue {
  public languages = {};
  public localizable = {};

  @Prop({ type: String, required: false, default: 'zh-CN' })
  private readonly locale!: string;

  @Provide()
  private get localeProvider() {
    return this;
  }

  @Watch('locale', { immediate: true })
  private async handleChangeLocale() {
    const localeExists = fs.existsSync(
      path.resolve(__static, `i18n/${this.locale}`),
    );
    const locale = localeExists ? this.locale : 'zh-CN';
    const uri = `/i18n/${locale}/languages.json`;
    this.languages = await fetch(uri).then(res => res.json());
  }

  render() {
    return <div id="app">{this.$slots.default}</div>;
  }
}
