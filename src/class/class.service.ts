import { Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { Class } from './entities/class.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(Class)
    private readonly classRepository: Repository<Class>
  ){}
  create(createClassDto: CreateClassDto) {
    const newClass = new CreateClassDto();
    newClass.name = createClassDto.name;
    newClass.level = createClassDto.level;
    newClass.tuition_fee = createClassDto.tuition_fee;

    return this.classRepository.save(newClass);
    
  }

  findAll() {
    // return `This action returns all class`;
    return this.classRepository.find();
  }

  async findOne(id: string) {
    // return `This action returns a #${id} class`;
    return await this.classRepository.findOne({where : {id : id}})
  }

  update(id: number, updateClassDto: UpdateClassDto) {
    return `This action updates a #${id} class`;
  }

  remove(id: number) {
    return `This action removes a #${id} class`;
  }
}
