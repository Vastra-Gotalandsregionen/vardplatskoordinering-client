import { VplReg } from '../domain/vpl-reg';

export class CalculateUtil {

  public static calculatePrognosis(reg: VplReg): number {
    return (reg.max || 0)
      - (reg.inneliggande || 0)
      + (reg.hem || 0)
      /*+ (reg.hemp || 0)*/
      - (reg.planIn || 0)
      /*+ (reg.medFardigbehandlade || 0)*/;
  }

  public static sumMultipleFields(vplRegs: VplReg[], fields: string[]) {
    return vplRegs.reduce((previousValue, vplReg) => previousValue + (this.sumFields(vplReg, fields) || 0), 0);
  }

  private static sumFields(vplReg: VplReg, fields: string[]) {
    return fields.reduce((previousValue, field) => previousValue + vplReg[field], 0);
  }
}
