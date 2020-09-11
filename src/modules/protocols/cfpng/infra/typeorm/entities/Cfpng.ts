import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";

@Entity("protocol_cfpng")
class Cfpng {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  breathLess: boolean;

  @Column()
  breathDifficulty: boolean;

  @Column()
  chestTightness: boolean;

  @Column()
  breathPressure: boolean;

  @Column()
  mentalConfusion: boolean;

  @Column()
  dizziness: boolean;

  @Column()
  draggedVoice: boolean;

  @Column()
  awakeDifficulty: boolean;

  @Column()
  blueSkin: boolean;

  @Column()
  lowPressure: boolean;

  @Column()
  pallor: boolean;

  @Column()
  sweating: boolean;

  @Column()
  oximetry: boolean;

  @Column()
  extraSymptom: boolean;

  @Column()
  newSymptom: string;

  @Column()
  approved: boolean;

  @Column()
  userId: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
export default Cfpng;
