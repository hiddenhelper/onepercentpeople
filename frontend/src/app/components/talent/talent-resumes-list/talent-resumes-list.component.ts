import { Component, OnInit } from '@angular/core';
import { Resume } from '@app/interfaces/resume';
import { ResumeService } from '@app/services/resume/resume.service';

@Component({
  selector: 'talent-resumes-list',
  templateUrl: './talent-resumes-list.component.html',
  styleUrls: ['./talent-resumes-list.component.scss']
})
export class TalentResumesListComponent implements OnInit {

  public resumes: Resume[] = [];

  /**
   * An array storing the values of all the resume ids that are being deleted.
   */
  public deleting_ids: any[] = [];

  constructor(
    private resumeService: ResumeService,
  ) { }

  ngOnInit(): void {
    this.loadResumes();
  }

  loadResumes(): void {
    this.resumeService.getAll({}).subscribe(response => {
      this.resumes = response.resumes;
    });
  }

  deleteResume(resume: Resume): void {
    if (resume.id) {
      this.deleting_ids.push(resume.id);
      this.resumeService.destroy(resume.id).subscribe(response => {
        this.resumes = this.resumes.filter(r => r.id !== resume.id);
        this.deleting_ids = this.deleting_ids.filter(e => e !== resume.id);
      });
    }
  }

}
